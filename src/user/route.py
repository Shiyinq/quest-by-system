from fastapi import APIRouter

from src.schemas import GeneralResponse
from src.user import service
from src.user.schemas import (
    ResponseStatsQuest,
    ResponseUserCreated,
    ResponseUserDetail,
    ResponseUserGeneratedQuest,
    ResponseUserHistoryQuest,
    UserCreate,
    UserGoalUpdate,
)

router = APIRouter()


@router.post("/users/register", status_code=201, response_model=ResponseUserCreated)
async def register_user(data: UserCreate):
    """Register User"""
    user = await service.register_user(data)
    return user


@router.get(
    "/users/{user_id}", status_code=200, response_model=ResponseUserDetail
)
async def get_user(user_id: str):
    """Get User"""
    user = await service.get_user(user_id)
    return user


@router.get(
    "/users/{user_id}/quests/generated",
    status_code=200,
    response_model=ResponseUserGeneratedQuest,
)
async def user_quest_generated(user_id: str, page: int = 1, limit: int = 10):
    """Get User Quest Generated"""
    generated = await service.user_quest_generated(user_id, page, limit)
    return generated


@router.get(
    "/users/{user_id}/quests/history",
    status_code=200,
    response_model=ResponseUserHistoryQuest,
)
async def user_quest_history(
    user_id: str, type: str = "all", status: str = None, page: int = 1, limit: int = 10
):
    """Get User Quest History"""
    history = await service.user_quest_history(user_id, type, status, page, limit)
    return history


@router.get(
    "/users/{user_id}/quests/stats", status_code=200, response_model=ResponseStatsQuest
)
async def user_quest_stats(user_id: str):
    """Get User Quest Stats"""
    stats = await service.stats(user_id)
    return stats


@router.post("/users/{user_id}/goal", status_code=200, response_model=GeneralResponse)
async def set_user_goal(user_id: str, data: UserGoalUpdate):
    """Set User Goal"""
    goal = await service.update_goal(user_id, data)
    return goal
