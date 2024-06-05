from fastapi import APIRouter

from src.auth import service
from src.auth.schemas import UserCreate
from src.schemas import GeneralResponse

router = APIRouter()


@router.post("/auth/sign-up", status_code=201, response_model=GeneralResponse)
async def sign_up_user(data: UserCreate):
    """Sign up User"""
    user = await service.sign_up(data)
    return user
