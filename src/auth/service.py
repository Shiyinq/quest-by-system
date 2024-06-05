from src.auth.constants import Info
from src.auth.exceptions import UserCreateFailed
from src.auth.schemas import UserCreate
from src.database import database
from src.schemas import GeneralResponse


async def sign_up(data: UserCreate) -> GeneralResponse:
    try:
        data = dict(data)
        user = await database.users.insert_one(data)
        if user:
            return {"message": Info.USER_CREATED}
    except Exception as e:
        print(e)
        raise UserCreateFailed()
