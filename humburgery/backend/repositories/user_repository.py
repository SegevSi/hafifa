from pymongo.asynchronous.database import AsyncDatabase
from database.models.user import UserModel
from exceptions import NotFoundException


async def get_user_by_name(username: str, db: AsyncDatabase) -> UserModel:
    if (
        user := await db["users"].find_one({"name": username})
    ) is not None:
        return UserModel(**user)

    raise NotFoundException(f"User with username {username} was not found")