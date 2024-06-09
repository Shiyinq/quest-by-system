from fastapi import APIRouter, Depends

from src import dependencies
from src.quest import service
from src.quest.schemas import (
    GenerateQuest,
    ResponseGeneratedQuest,
    ResponseGetQuest,
    UpdateStatusQuest,
)
from src.schemas import GeneralResponse

router = APIRouter(dependencies=[Depends(dependencies.validate_token)])


@router.post("/quests/generate", status_code=201, response_model=ResponseGeneratedQuest)
async def generate_quest(
    data: GenerateQuest, current_user=Depends(dependencies.get_current_user)
):
    """Generate Quest"""
    data.userId = current_user.userId
    quest = await service.generate_quest(data)
    return quest


@router.post(
    "/quests/{quest_id}/accept", status_code=200, response_model=GeneralResponse
)
async def accept_quest(quest_id: str):
    """Accept Quest"""
    accept = await service.accept_quest(quest_id)
    return accept


@router.put(
    "/quests/{quest_id}/status", status_code=200, response_model=GeneralResponse
)
async def update_status_quest(quest_id: str, data: UpdateStatusQuest):
    """Update Status Quest Accepted"""
    accept = await service.update_status_quest(quest_id, data)
    return accept


@router.get("/quests/{quest_id}", status_code=200, response_model=ResponseGetQuest)
async def get_quest(quest_id: str, type: str = None):
    """Get Quest Accepted"""
    quest = await service.get_quest(quest_id, type)
    return quest
