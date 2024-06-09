from fastapi import APIRouter, Depends

from src import dependencies
from src.schemas import GeneralResponse
from src.user import service
from src.user.schemas import (
    ResponseStatsQuest,
    ResponseUserDetail,
    ResponseUserGeneratedQuest,
    ResponseUserHistoryQuest,
    UserGoalUpdate,
)

router = APIRouter(dependencies=[Depends(dependencies.validate_token)])


@router.get("/users/me", status_code=200, response_model=ResponseUserDetail)
async def get_user(current_user=Depends(dependencies.get_current_user)):
    """Get User"""
    return current_user


@router.get(
    "/users/quests/generated",
    status_code=200,
    response_model=ResponseUserGeneratedQuest,
)
async def user_quest_generated(
    page: int = 1, limit: int = 10, current_user=Depends(dependencies.get_current_user)
):
    """Get User Quest Generated"""
    generated = await service.user_quest_generated(current_user.userId, page, limit)
    return generated


@router.get(
    "/users/quests/history",
    status_code=200,
    response_model=ResponseUserHistoryQuest,
)
async def user_quest_history(
    type: str = "all",
    status: str = None,
    page: int = 1,
    limit: int = 10,
    current_user=Depends(dependencies.get_current_user),
):
    """Get User Quest History"""
    history = await service.user_quest_history(
        current_user.userId, type, status, page, limit
    )
    return history


@router.get("/users/quests/stats", status_code=200, response_model=ResponseStatsQuest)
async def user_quest_stats(current_user=Depends(dependencies.get_current_user)):
    """Get User Quest Stats"""
    stats = await service.stats(current_user.userId)
    return stats


@router.put("/users/goal", status_code=200, response_model=GeneralResponse)
async def set_user_goal(
    data: UserGoalUpdate, current_user=Depends(dependencies.get_current_user)
):
    """Set User Goal"""
    goal = await service.update_goal(current_user.userId, data)
    return goal
