from datetime import datetime
from typing import List, Union

from passlib.context import CryptContext
from pydantic import BaseModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class ResponseUserDetail(BaseModel):
    userId: str
    username: Union[str, None] = None
    name: Union[str, None] = None
    goal: Union[str, None] = None
    source: Union[str, None] = None
    createdAt: Union[datetime, None] = None
    updatedAt: Union[datetime, None] = None


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
    quest: str
    status: str
    createdAt: datetime = None
    acceptedAt: datetime = None


class DataUserQuestGenerated(BaseModel):
    questId: str
    userId: str
    type: str
    quest: str
    status: str
    createdAt: datetime


class ResponseUserHistoryQuest(BaseModel):
    metadata: Metadata
    data: List[DataUserQuestHistory]


class ResponseUserGeneratedQuest(BaseModel):
    metadata: Metadata
    data: List[DataUserQuestGenerated]


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
