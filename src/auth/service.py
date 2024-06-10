from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

from src.auth.constants import Info
from src.auth.exceptions import IncorrectEmailOrPassword, UserCreateFailed
from src.auth.schemas import Token, User, UserSignUp
from src.config import config
from src.database import database
from src.schemas import GeneralResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def sign_up(data: UserSignUp) -> GeneralResponse:
    try:
        data = dict(data)
        user = await database.users.insert_one(data)
        if user:
            return {"message": Info.USER_CREATED}
    except Exception as e:
        print(e)
        raise UserCreateFailed()


def verify_password(plain_password, hashed_password) -> str:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta = None) -> Token:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.secret_key, algorithm=config.algorithm)
    return {
        "access_token": encoded_jwt,
        "expire": expire.timestamp(),
        "token_type": "bearer",
    }


async def check_user(username_or_email: str) -> User:
    query = {
        "$or": [
            {"username": username_or_email},
            {"email": username_or_email},
            {"userId": username_or_email},
        ]
    }
    user = await database.users.find_one(query, {"_id": 0})
    if user:
        return User(**user)


async def authenticate_user(
    username_or_email: str, password: str = None, provider: str = None
) -> User:
    user = await check_user(username_or_email)
    if not user and provider is None:
        raise IncorrectEmailOrPassword()
    elif not user and provider:
        return False
    if password and not verify_password(password, user.password):
        raise IncorrectEmailOrPassword()

    return user
