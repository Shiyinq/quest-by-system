from datetime import datetime
from typing import List, Union

from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    userId: str
    name: str
    goal: str = None
    source: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)


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
