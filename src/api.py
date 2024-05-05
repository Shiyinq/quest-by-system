from fastapi import APIRouter

from src.quest.route import router as quest_router
from src.user.route import router as user_router

router = APIRouter()

router.include_router(quest_router, tags=["Quest"])
router.include_router(user_router, tags=["User"])
