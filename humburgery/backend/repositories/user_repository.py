from exceptions import NotFoundException
from database.models import User


async def get_user_by_name(username: str) -> User:
    if (
        user := await User.find_one({"name": username})
    ) is not None:
        return user

    raise NotFoundException(f"User with username {username} was not found")