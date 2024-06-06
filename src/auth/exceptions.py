from src.auth.constants import ErrorCode
from src.exceptions import InternalServerError, NotAuthenticated


class UserCreateFailed(InternalServerError):
    DETAIL = ErrorCode.USER_CREATE_FAILED


class IncorrectEmailOrPassword(NotAuthenticated):
    DETAIL = ErrorCode.INCORRECT_EMAIL_ERROR_PASSWORD
