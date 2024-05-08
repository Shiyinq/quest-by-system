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


async def ollama(prompt) -> dict:
    try:
        response = await AsyncClient().chat(
            model="llama3:instruct",
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
    role = "software engineer"
    prompts = {
        "daily": daily_prompt(role),
        "weekly": weekly_prompt(role),
        "monthly": monthly_prompt(role),
        "side": side_prompt(role),
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


async def get_quest(quest_id: str) -> ResponseGetQuest:
    try:
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
