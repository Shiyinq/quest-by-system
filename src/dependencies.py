from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from src.auth.exceptions import JwtTokenError
from src.auth.schemas import UserId
from src.auth.service import get_user
from src.config import config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/sign-in")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserId:
    try:
        payload = jwt.decode(token, config.secret_key, algorithms=[config.algorithm])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise JwtTokenError()
    except JWTError:
        raise JwtTokenError()

    user = await get_user(user_id)
    if user is None:
        raise JwtTokenError()
    return UserId(userId=user.userId)
