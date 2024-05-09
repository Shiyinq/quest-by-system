from datetime import datetime
from typing import Literal, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class GenerateQuest(BaseModel):
    questId: UUID = Field(default_factory=lambda: str(uuid4()))
    userId: str
    type: Literal["daily", "weekly", "monthly", "side"]
    quest: str = None
    createdAt: datetime = datetime.now()

    class Config:
        json_schema_extra = {
            "example": {
                "userId": "unique-string",
                "type": "daily",
            }
        }


class ResponseGeneratedQuest(BaseModel):
    questId: str
    userId: str
    quest: str


class ResponseGetQuest(BaseModel):
    questId: str
    userId: str
    type: str
    quest: str
    createdAt: Union[datetime, None] = None
    acceptedAt: Union[datetime, None] = None


class UpdateStatusQuest(BaseModel):
    status: str
    statusUpdatedAt: datetime = datetime.now()