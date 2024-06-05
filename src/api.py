from fastapi import APIRouter

from src.auth.route import router as auth_router
from src.healthcheck.route import router as healthcheck_router
from src.quest.route import router as quest_router
from src.user.route import router as user_router

router = APIRouter()

router.include_router(auth_router, tags=["Auth"])
router.include_router(user_router, tags=["User"])
router.include_router(quest_router, tags=["Quest"])
router.include_router(healthcheck_router, tags=["Health Check"])
