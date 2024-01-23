from fastapi import APIRouter, HTTPException
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import Usuario
from app.database import database
import os
import jwt
from dotenv import load_dotenv

router = APIRouter()


@router.get("/users", tags=["users"])
async def get_users():
    try:
        query = "SELECT * FROM users"
        users = await database.fetch_all(query=query)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/users", tags=["users"])
async def create_user(user: Usuario):
    try:
        email_verify = "SELECT * FROM users WHERE email = :email"
        user_exist = await database.fetch_one(query=email_verify, values={"email": user.email})
        if user_exist:
            raise HTTPException(status_code=400, detail="User already exists")
        query = "INSERT INTO users (name, user, email, password) VALUES (:name, :user, :email, :password) RETURNING user_id, nombre"
        values = {"name": user.name, "user": user.user,
                  "email": user.email, "password": generate_password_hash(user.password)}
        created_user = await database.execute(query=query, values=values)
        if created_user:
            user_id = created_user[0]
            name = created_user[1]

            payload = {"sub": user_id, "name": name}
            token = jwt.encode(payload, os.getenv(
                "SECRET_KEY"), algorithm="HS256")
            return {"token": token}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
