import os

from dotenv import load_dotenv

load_dotenv(verbose=True)


class Config:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.mongo_uri = os.getenv("MONGODB_URI")
        self.secret_key = os.getenv("SECRET_KEY")
        self.algorithm = os.getenv("ALGORITHM")
        self.access_token_expire_minutes = os.getenv("TOKEN_EXPIRE")
        self.model = os.getenv("MODEL")
        self.ollama_host = os.getenv("OLLAMA_HOST")


config = Config()
