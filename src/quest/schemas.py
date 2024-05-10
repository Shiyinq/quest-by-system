from datetime import datetime
from typing import Literal, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


def uniqueQuestId():
    return "quest_" + str(uuid4()).replace("-", "")[:24]


class GenerateQuest(BaseModel):
    questId: UUID = Field(default_factory=uniqueQuestId)
    userId: str
    type: Literal["daily", "weekly", "monthly", "side"]
    quest: str = None
    status: str = "generated"
    createdAt: datetime = Field(default_factory=datetime.now)
    acceptedAt: datetime = None
    statusUpdatedAt: datetime = None

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
    status: Union[str, None] = None
    createdAt: Union[datetime, None] = None
    acceptedAt: Union[datetime, None] = None
    statusUpdatedAt: Union[datetime, None] = None


class UpdateStatusQuest(BaseModel):
    status: str
    statusUpdatedAt: datetime = Field(default_factory=datetime.now)
