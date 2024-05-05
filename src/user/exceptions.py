from src.exceptions import InternalServerError, NotFound
from src.user.constants import ErrorCode


class UserNotFound(NotFound):
    DETAIL = ErrorCode.USER_NOT_FOUND


class UserCreateFailed(InternalServerError):
    DETAIL = ErrorCode.USER_CREATE_FAILED


class UserGetDetailFailed(InternalServerError):
    DETAIL = ErrorCode.USER_GET_DETAIL_FAILED


class UserQuestHistoryFailed(InternalServerError):
    DETAIL = ErrorCode.USER_QUEST_HISTORY_FAILED
