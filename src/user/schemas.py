from datetime import datetime
from typing import List, Union

from pydantic import BaseModel


class UserCreate(BaseModel):
    userId: str
    name: str
    source: str
    createdAt: datetime = datetime.now()
    updatedAt: datetime = datetime.now()


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
    createdAt: datetime = None
    acceptedAt: datetime = None


class ResponseUserHistoryQuest(BaseModel):
    metadata: Metadata
    data: List[DataUserQuestHistory]
