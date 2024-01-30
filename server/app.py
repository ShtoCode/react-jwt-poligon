from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from flasgger import Swagger
from functools import wraps
import os
from . import db
from .db import get_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config.from_mapping(
    SECRET_KEY=os.environ.get('SECRET_KEY'),
    DATABASE=os.environ.get('DATABASE'),
    DATABASE_USER=os.environ.get('DATABASE_USER'),
    DATABASE_PASSWORD=os.environ.get('DATABASE_PASSWORD'),
    DATABASE_HOST=os.environ.get('DATABASE_HOST'),
)

swagger = Swagger(app)
db.init_app(app)


def create_jwt(user, email):
    """Create JWT token"""
    token = jwt.encode({
        'exp': datetime.utcnow() + timedelta(minutes=60),
        'user': user,
        'email': email,
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return token


def create_refresh_token(user, email):
    """Create JWT refresh token"""
    refresh_token = jwt.encode({
        'exp': datetime.utcnow() + timedelta(days=1),
        'user': user,
        'email': email,
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return refresh_token


@app.route('/auth/register', methods=['POST'])
def register():
    """
    Registra un usuario, con nombre, email y password. Devuelve un token de acceso y un refresh token (JWT).
    ---
    parameters:
      - in: body
        name: user
        description: User information
        required: true
        schema:
          type: object
          properties:
            nombre:
              type: string
              description: The name of the user.
            email:
              type: string
              description: The email of the user.
            password:
              type: string
              description: The password of the user.
    responses:
      200:
        description: Successful registration.
        schema:
          properties:
            token:
              type: string
            refresh_token:
              type: string"""

    nombre = request.json['nombre']
    email = request.json['email']
    password = request.json['password']
    error = None
    db, c = get_db()

    if not nombre or not email or not password:
        return make_response(jsonify({'error': 'All fields are required'}), 401)

    c.execute('SELECT * FROM usuario WHERE email = %s', (email,))
    user = c.fetchone()
    if user is not None:
        return make_response(jsonify({'error': 'Email already in use'}), 401)

    if error is None:
        c.execute(
            "INSERT INTO usuario (nombre, email, password) VALUES (%s, %s, %s)",
            (nombre, email, generate_password_hash(password))
        )
        db.commit()
        token = create_jwt(nombre, email)
        refresh_token = create_refresh_token(nombre, email)
        return make_response(jsonify({'access': token, 'refresh': refresh_token}), 200)


@app.route('/auth/login', methods=['POST'])
def login():
    """
    Autentica un usuario, con email y password. Devuelve un token de acceso y un refresh token (JWT).
    ---
    parameters:
      - in: body
        name: user
        description: User information
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
              description: The email of the user.
            password:
              type: string
              description: The password of the user.
    responses:
      200:
        description: Successful login.
        schema:
          properties:
            token:
              type: string
            refresh_token:
              type: string
      401:
        description: Invalid credentials.
    """
    email = request.json['email']
    password = request.json['password']
    db, c = get_db()
    c.execute(
        "SELECT * FROM usuario WHERE email = %s", (email,)
    )
    user = c.fetchone()
    if user and check_password_hash(user['password'], password):
        token = create_jwt(user['nombre'], user['email'])
        refresh_token = create_refresh_token(user['nombre'], user['email'])
        return make_response(jsonify({'access': token, 'refresh': refresh_token}), 200)
    else:
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)


@app.route('/auth/refresh', methods=['POST'])
def refresh():
    """
    Refresh token (JWT).
    ---
    parameters:
      - in: body
        name: refresh
        description: Current refresh token.
        required: true
        schema:
          type: object
          properties:
            refresh:
              type: string
    responses:
      200:
        description: Obtiene un nuevo token de acceso y un nuevo token de refresco.
        schema:
          type: object
          properties:
            access_token:
              type: string
            refresh_token:
              type: string
      401:
        description: Token expirado o incorrecto.
    """
    refresh_token = request.json.get('refresh')
    try:
        data = jwt.decode(
            refresh_token, app.config['SECRET_KEY'], algorithms=['HS256'])

        user = data['user']
        email = data['email']
        new_access_token = create_jwt(user, email)
        new_refresh_token = create_refresh_token(
            user, email)
        return make_response(jsonify({'access': new_access_token, 'refresh': new_refresh_token}), 200)
    except jwt.ExpiredSignatureError:
        return make_response(jsonify({'error': 'Refresh token has expired'}), 401)
    except jwt.InvalidTokenError:
        return make_response(jsonify({'error': 'Invalid refresh token'}), 401)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
