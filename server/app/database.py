from databases import Database
import os
import sqlalchemy
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_SERVER')}/{os.getenv('POSTGRES_DB')}"
database = Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
