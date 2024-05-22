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


class UserQuestGeneratedFailed(InternalServerError):
    DETAIL = ErrorCode.USER_QUEST_GENERATED_FAILED


class UserQuestGetStatsFailed(InternalServerError):
    DETAIL = ErrorCode.USER_QUEST_GET_STATS_FAILED


class UserUpdateGoalFailed(InternalServerError):
    DETAIL = ErrorCode.USER_UPDATE_GOAL_FAILED
