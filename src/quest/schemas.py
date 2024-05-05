from datetime import datetime
from typing import Literal
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class GenerateQuest(BaseModel):
    questId: UUID = Field(default_factory=lambda: str(uuid4()))
    userId: str
    type: Literal["daily", "weekly", "monthly", "side"]
    createdAt: datetime = datetime.now()


class ResponseGeneratedQuest(BaseModel):
    questId: str
    userId: str
    quest: str


class ResponseAcceptedQuest(BaseModel):
    message: str
