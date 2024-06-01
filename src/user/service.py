from datetime import datetime

from src.database import database
from src.schemas import GeneralResponse
from src.user.constants import Info
from src.user.exceptions import (
    UserCreateFailed,
    UserGetDetailFailed,
    UserNotFound,
    UserQuestGeneratedFailed,
    UserQuestGetStatsFailed,
    UserQuestHistoryFailed,
    UserUpdateGoalFailed,
)
from src.user.schemas import (
    ResponseStatsQuest,
    ResponseUserCreated,
    ResponseUserDetail,
    ResponseUserGeneratedQuest,
    ResponseUserHistoryQuest,
    UserCreate,
    UserGoalUpdate,
)
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


async def get_user(user_id: str) -> ResponseUserDetail:
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


async def user_quest_generated(
    user_id: str, page: int, limit: int
) -> ResponseUserGeneratedQuest:
    skip = (page - 1) * limit
    try:
        query = {"userId": user_id}
        user = await database.users.find_one(query, {"_id": 0})
        if not user:
            raise UserNotFound()

        total_generated = await database.generated_quest.count_documents(query)
        generated = (
            await database.generated_quest.find(query, {"_id": 0})
            .sort("createdAt", -1)
            .skip(skip)
            .limit(limit)
            .to_list(length=None)
        )
        metadata = pagination(total_generated, page, limit)
        return {"metadata": metadata, "data": generated}
    except UserNotFound:
        raise UserNotFound()
    except Exception as e:
        print(e)
        raise UserQuestGeneratedFailed()


async def user_quest_history(
    user_id: str, quest_type: str, quest_status: str, page: int, limit: int
) -> ResponseUserHistoryQuest:
    skip = (page - 1) * limit
    try:
        query = {}
        if quest_type == "all":
            query = {"userId": user_id}
        else:
            query = {"userId": user_id, "type": quest_type}

        if quest_status and quest_status != "null":
            query["status"] = quest_status

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


async def stats(user_id: str) -> ResponseStatsQuest:
    query = [
        {"$match": {"userId": user_id}},
        {
            "$lookup": {
                "from": "accepted_quest",
                "localField": "userId",
                "foreignField": "userId",
                "as": "quests",
            }
        },
        {"$unwind": "$quests"},
        {
            "$group": {
                "_id": {"type": "$quests.type", "status": "$quests.status"},
                "totalQuests": {"$sum": 1},
            }
        },
        {
            "$project": {
                "type": "$_id.type",
                "status": "$_id.status",
                "totalQuests": 1,
                "_id": 0,
            }
        },
    ]

    try:
        stats_quest_cursor = database.users.aggregate(query)
        stats_quest = await stats_quest_cursor.to_list(length=None)

        group_stats = {
            "daily": {
                "in_progress": 0,
                "completed": 0,
                "not_completed":0
            },
            "weekly": {
                "in_progress":0,
                "completed":0,
                "not_completed":0
            },
            "monthly": {
                "in_progress":0,
                "completed":0,
                "not_completed":0
            },
            "side": {
                "in_progress":0,
                "completed": 0,
                "not_completed": 0
            }
        }
        for item in stats_quest:
            quest_type = item["type"]
            status = item["status"].replace(" ", "_")
            if quest_type not in group_stats:
                group_stats[quest_type] = {
                    "in_progress": 0,
                    "completed": 0,
                    "not_completed": 0,
                }
            group_stats[quest_type][status] += item["totalQuests"]
        return group_stats
    except Exception as e:
        print(e)
        raise UserQuestGetStatsFailed()


async def update_goal(user_id: str, data: UserGoalUpdate) -> GeneralResponse:
    try:
        goal = await database.users.update_one(
            {"userId": user_id},
            {"$set": {"goal": data.goal, "updatedAt": datetime.now()}},
        )

        if not goal.matched_count:
            raise UserNotFound()

        return {"message": Info.USER_UPDATE_GOAL}
    except UserNotFound:
        raise UserNotFound()
    except Exception as e:
        print(e)
        raise UserUpdateGoalFailed()
