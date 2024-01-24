# Acerca del Proyecto
Este proyecto fue creado con React y Vite, utilizando diversas bibliotecas para facilitar el desarrollo. También integra la API de Polygon para obtener datos financieros y de mercado en tiempo real.

## Librerías Utilizadas:
* API Flask: Esta API creada en flask proporciona endpoints de autenticación utilizando un hash en las contraseñas y JWT para comunicarse con el frontend.
* React Router DOM: Para la navegación en la aplicación.
* Chart.js y react-chartjs-2: Para visualización de gráficos y estadísticas.
* Formik: Para la gestión de formularios.
* JWT: Para la autenticación y gestión de tokens.
* Contexto de React: Para la gestión del estado global en la aplicación.
* API de Polygon: Para obtener datos financieros y de mercado en tiempo real.

## Tecnologías utilizadas:
* ReactJS
* TailwindCSS
* Flask


## Configuración del Entorno de Desarrollo de Servidor

     git clone https://github.com/ShtoCode/react-jwt-poligon.git
     cd server



1. Cree un entorno virtual de Python utilizando una de las siguientes opciones:

   - Utilizando `virtualenv`:
     ```bash
     pip install virtualenv
     ```

   - Utilizando `venv` (dependiendo de su versión de Python):
     ```bash
     pip install venv
     ```

2. Crear y activar el entorno virtual de Python:
   - En Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - En consola Git:
     ```bash
     python3 -m venv venv
     . venv/Scripts/activate
     ```

## Instalación de Dependencias

3. Instale las dependencias del proyecto desde el archivo `requirements.txt`:
   ```bash
   pip install -r requirements.txt

## Instalación y configuración de base de datos

4. Instale PostgreSQL y configure su base de datos.

5. En el archivo .env, proporcione la información necesaria para la conexión a la base de datos. Debe configurar las siguientes variables de entorno:
  ```
SECRET_KEY="CLAVE_SECRETA POR UUID O RANDOM"
DATABASE="NOMBRE_BASE_DE_DATOS"
DATABASE_USER="NOMBRE_USUARIO_POSTGRES"
DATABASE_PASSWORD="PASSWORD"
DATABASE_HOST="HOST || localhost"
  ```
## Inicialización de base de datos
  ```
  flask init-db
  ```
## Ejecución de aplicación

6. Para iniciar la aplicación, ejecute el siguiente comando:
  ```
    flask run
  ```
   
## Modo Debug de Flask

7. Para evitar tener que detener y reiniciar el servidor cada vez que realice cambios en el código, configure el modo de depuración de Flask. En Git Bash, ejecute el siguiente comando:
   ```
    export FLASK_DEBUG=1
   ```

## Configuración del Entorno de Desarrollo de frontend

1. En la carpeta raiz del repositorio instale las dependencias con NPM:
   ```bash
   npm install

2. Configure el .env del cliente para utilizar la api de Polygon (https://polygon.io/docs/stocks):
   ```bash
   VITE_POLYGON_API_KEY="TUAPIPOLYGON"

3. Ejecute el proyecto:
   ```bash
   npm run dev



