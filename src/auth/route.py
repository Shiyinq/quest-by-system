from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from src.auth import service
from src.auth.schemas import Token, UserSignUp
from src.schemas import GeneralResponse

router = APIRouter()


@router.post("/auth/sign-up", status_code=201, response_model=GeneralResponse)
async def sign_up_user(data: UserSignUp):
    """Sign up User"""
    user = await service.sign_up(data)
    return user


@router.post("/auth/sign-in", status_code=200, response_model=Token)
async def sign_up_user(form_data: OAuth2PasswordRequestForm = Depends()):
    """Sign in User"""
    user = await service.authenticate_user(form_data.username, form_data.password)
    access_token = service.create_access_token(data={"sub": user.userId})

    return access_token
