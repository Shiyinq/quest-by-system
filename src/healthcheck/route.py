import os

from dotenv import load_dotenv
from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from pymongo.errors import ServerSelectionTimeoutError

load_dotenv(verbose=True)

router = APIRouter()


class ResponseHealthCheck(BaseModel):
    api_status: str
    db_status: str


async def check_mongodb_connection() -> bool:
    try:
        client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
        client[os.getenv("DB_NAME")]
        await client.server_info()
        return True
    except ServerSelectionTimeoutError as st:
        print(st)
        return False
    except Exception as e:
        print(e)
        return False


@router.get("/healthcheck", status_code=200, response_model=ResponseHealthCheck)
async def healthcheck():
    db_status = "UP" if await check_mongodb_connection() else "DOWN"
    return {"api_status": "UP", "db_status": db_status}
