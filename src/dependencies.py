from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from src.auth.exceptions import JwtTokenError
from src.config import config
from src.user.schemas import ResponseUserDetail
from src.user.service import get_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/sign-in")


async def validate_token(token: str = Depends(oauth2_scheme)) -> str:
    try:
        payload = jwt.decode(token, config.secret_key, algorithms=[config.algorithm])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise JwtTokenError()
        return user_id
    except JWTError as je:
        print(je)
        raise JwtTokenError()


async def get_current_user(
    user_id: str = Depends(validate_token),
) -> ResponseUserDetail:
    user = await get_user(user_id)
    if user is None:
        raise JwtTokenError()
    return ResponseUserDetail(**user)
