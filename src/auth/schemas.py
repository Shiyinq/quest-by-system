from datetime import datetime
from uuid import uuid4

from passlib.context import CryptContext
from pydantic import BaseModel, Field, model_validator

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def has_password(password) -> str:
    return pwd_context.hash(password)


class UserSignUp(BaseModel):
    userId: str = None
    username: str
    name: str
    goal: str = None
    source: str
    password: str = None
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

    @model_validator(mode="after")
    def update_data(cls, values):
        if values.userId is None:
            values.userId = str(uuid4())

        if values.password:
            values.password = has_password(values.password)

        return values

    class Config:
        json_schema_extra = {
            "example": {
                "username": "Zer0",
                "name": "Zero",
                "source": "web",
                "password": "Zero123!",
            }
        }


class User(BaseModel):
    userId: str
    password: str


class Token(BaseModel):
    token_type: str
    expire: float
    access_token: str
