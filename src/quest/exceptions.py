from src.exceptions import InternalServerError, NotFound
from src.quest.constants import ErrorCode


class QuestGenerateFailed(InternalServerError):
    DETAIL = ErrorCode.QUEST_GENERATE_FAILED


class QuestSaveFailed(InternalServerError):
    DETAIL = ErrorCode.QUEST_SAVE_FAILED


class QuestNotFound(NotFound):
    DETAIL = ErrorCode.QUEST_NOT_FOUND


class QuestAcceptFailed(InternalServerError):
    DETAIL = ErrorCode.QUEST_ACCEPT_FAILED
