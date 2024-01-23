from fastapi import FastAPI
from app.routes import users
from app.database import database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)


@app.on_event("startup")
async def startup_db():
    await database.connect()


@app.on_event("shutdown")
async def shutdown_db():
    await database.disconnect()
