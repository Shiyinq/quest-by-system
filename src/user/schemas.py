from datetime import datetime
from typing import List, Union
from uuid import uuid4

from passlib.context import CryptContext
from pydantic import BaseModel, Field, model_validator

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def has_password(password) -> str:
    return pwd_context.hash(password)


class UserCreate(BaseModel):
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


class ResponseUserDetail(BaseModel):
    userId: str
    username: Union[str, None] = None
    name: Union[str, None] = None
    goal: Union[str, None] = None
    source: Union[str, None] = None
    createdAt: Union[datetime, None] = None
    updatedAt: Union[datetime, None] = None


class ResponseUserCreated(BaseModel):
    message: str


class Metadata(BaseModel):
    page: Union[int, None] = None
    limit: Union[int, None] = None
    prevPage: Union[int, None] = None
    nextPage: Union[int, None] = None
    totalPage: Union[int, None] = None


class DataUserQuestHistory(BaseModel):
    questId: str
    userId: str
    type: str
    status: str
    createdAt: datetime = None
    acceptedAt: datetime = None


class ResponseUserHistoryQuest(BaseModel):
    metadata: Metadata
    data: List[DataUserQuestHistory]


class TaskStatus(BaseModel):
    in_progress: int
    completed: int
    not_completed: int


class ResponseStatsQuest(BaseModel):
    daily: TaskStatus
    weekly: TaskStatus
    monthly: TaskStatus
    side: TaskStatus


class UserGoalUpdate(BaseModel):
    goal: str
