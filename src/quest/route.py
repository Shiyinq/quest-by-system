from fastapi import APIRouter

from src.quest import service
from src.quest.schemas import (
    GenerateQuest,
    ResponseAcceptedQuest,
    ResponseGeneratedQuest,
    ResponseGetQuest,
)

router = APIRouter()


@router.post("/quests/generate", status_code=201, response_model=ResponseGeneratedQuest)
async def generate_quest(data: GenerateQuest):
    """Generate Quest"""
    quest = await service.generate_quest(data)
    return quest


@router.post(
    "/quests/{quest_id}/accept", status_code=200, response_model=ResponseAcceptedQuest
)
async def accept_quest(quest_id: str):
    """Accept Quest"""
    accept = await service.accept_quest(quest_id)
    return accept


@router.get("/quests/{quest_id}", status_code=200, response_model=ResponseGetQuest)
async def get_quest(quest_id: str):
    """Get Quest Accepted"""
    quest = await service.get_quest(quest_id)
    return quest
