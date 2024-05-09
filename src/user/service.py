from src.database import database
from src.user.constants import Info
from src.user.exceptions import (
    UserCreateFailed,
    UserGetDetailFailed,
    UserNotFound,
    UserQuestHistoryFailed,
)
from src.user.schemas import ResponseUserCreated, ResponseUserHistoryQuest, UserCreate
from src.utils import pagination


async def register_user(data: UserCreate) -> ResponseUserCreated:
    try:
        data = dict(data)
        user = await database.users.insert_one(data)
        if user:
            return {"message": Info.USER_CREATED}
    except Exception as e:
        print(e)
        raise UserCreateFailed()


async def get_user(user_id: str) -> UserCreate:
    try:
        user = await database.users.find_one({"userId": user_id}, {"_id": 0})
        if user:
            return user
        raise UserNotFound()
    except UserNotFound:
        raise UserNotFound()
    except Exception as e:
        print(e)
        raise UserGetDetailFailed()


async def user_quest_history(
    user_id: str, quest_type: str, page: int, limit: int
) -> ResponseUserHistoryQuest:
    skip = (page - 1) * limit
    try:
        query = {}
        if quest_type == "all":
            query = {"userId": user_id}
        else:
            query = {"userId": user_id, "type": quest_type}

        user = await database.users.find_one({"userId": user_id}, {"_id": 0})
        if not user:
            raise UserNotFound()

        total_history = await database.accepted_quest.count_documents(query)
        history = (
            await database.accepted_quest.find(query, {"_id": 0})
            .sort("acceptedAt", -1)
            .skip(skip)
            .limit(limit)
            .to_list(length=None)
        )
        metadata = pagination(total_history, page, limit)
        return {"metadata": metadata, "data": history}
    except UserNotFound:
        raise UserNotFound()
    except Exception as e:
        print(e)
        raise UserQuestHistoryFailed()
