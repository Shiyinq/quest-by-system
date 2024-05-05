from datetime import datetime

from ollama import AsyncClient

from src.database import database
from src.quest.constants import Info
from src.quest.exceptions import (
    QuestAcceptFailed,
    QuestGenerateFailed,
    QuestNotFound,
    QuestSaveFailed,
)
from src.quest.prompt import daily_prompt, monthly_prompt, side_prompt, weekly_prompt
from src.quest.schemas import (
    GenerateQuest,
    ResponseAcceptedQuest,
    ResponseGeneratedQuest,
)


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
        data = dict(data)
        data["quest"] = quest

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


async def accept_quest(quest_id: str) -> ResponseAcceptedQuest:
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
