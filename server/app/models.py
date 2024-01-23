from pydantic import BaseModel


class Usuario(BaseModel):
    name: int
    user: str
    email: str
    password: str
