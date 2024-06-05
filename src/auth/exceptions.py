from src.auth.constants import ErrorCode
from src.exceptions import InternalServerError


class UserCreateFailed(InternalServerError):
    DETAIL = ErrorCode.USER_CREATE_FAILED
