from datetime import datetime

from ollama import AsyncClient

from src.database import database
from src.quest.constants import Info
from src.quest.exceptions import (
    QuestAcceptFailed,
    QuestGenerateFailed,
    QuestGetFailed,
    QuestNotFound,
    QuestSaveFailed,
    QuestStatusUpdateFailed,
)
from src.quest.prompt import daily_prompt, monthly_prompt, side_prompt, weekly_prompt
from src.quest.schemas import (
    GenerateQuest,
    ResponseGeneratedQuest,
    ResponseGetQuest,
    UpdateStatusQuest,
)
from src.schemas import GeneralResponse
from src.user.service import get_user
from src.config import config


async def ollama(prompt) -> dict:
    try:
        response = await AsyncClient(host=config.ollama_host).chat(
            model=config.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            stream=False,
        )

        return response
    except Exception as e:
        print(e)
        raise QuestGenerateFailed()


async def generate_quest(data: GenerateQuest) -> ResponseGeneratedQuest:
    user = await get_user(data.userId)
    goal = user["goal"]
    prompts = {
        "daily": daily_prompt(goal),
        "weekly": weekly_prompt(goal),
        "monthly": monthly_prompt(goal),
        "side": side_prompt(goal),
    }
    prompt = prompts[data.type]
    response = await ollama(prompt)
    quest = response["message"]["content"]

    try:
        data.quest = quest
        data = dict(data)
        new_quest = await database.generated_quest.insert_one(data)
        if new_quest.inserted_id:
            if "_id" in data:
                del data["_id"]
            return data

        raise QuestSaveFailed()
    except QuestSaveFailed():
        raise QuestSaveFailed()
    except Exception as e:
        print(e)
        raise QuestGenerateFailed()


async def accept_quest(quest_id: str) -> GeneralResponse:
    quest = await database.generated_quest.find_one({"questId": quest_id}, {"_id": 0})
    if not quest:
        raise QuestNotFound()

    try:
        quest["status"] = "in progress"
        quest["acceptedAt"] = datetime.now()
        accepted = await database.accepted_quest.insert_one(quest)
        if accepted.inserted_id:
            await database.generated_quest.delete_one({"questId": quest_id})
            return {"message": Info.QUEST_ACCEPTED}

        raise QuestAcceptFailed()
    except QuestAcceptFailed():
        raise QuestAcceptFailed()
    except Exception as e:
        print(e)
        raise QuestAcceptFailed()


async def get_quest(quest_id: str, type: str) -> ResponseGetQuest:
    try:
        if type == "generated":
            quest = await database.generated_quest.find_one(
                {"questId": quest_id}, {"_id": 0}
            )
        else:
            quest = await database.accepted_quest.find_one(
                {"questId": quest_id}, {"_id": 0}
            )
        if not quest:
            raise QuestNotFound()

        return quest
    except QuestNotFound:
        raise QuestNotFound()
    except Exception as e:
        print(e)
        raise QuestGetFailed()


async def update_status_quest(
    quest_id: str, data: UpdateStatusQuest
) -> GeneralResponse:
    try:
        quest = await database.accepted_quest.update_one(
            {"questId": quest_id}, {"$set": dict(data)}
        )
        if not quest.matched_count:
            raise QuestNotFound()

        return {"message": Info.QUEST_STATUS_UPDATED}
    except QuestNotFound:
        raise QuestNotFound()
    except Exception as e:
        print(e)
        raise QuestStatusUpdateFailed()
