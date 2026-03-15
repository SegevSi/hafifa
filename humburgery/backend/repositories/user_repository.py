from beanie import PydanticObjectId
from pymongo.asynchronous.client_session import AsyncClientSession
from exceptions import NotFoundException
from database.models import User, Vote


async def get_user_by_name(username: str, session: AsyncClientSession) -> User:
    if (
        user := await User.find_one({"name": username}, session=session)
    ) is not None:
        return user

    raise NotFoundException(f"User with username {username} was not found")


async def get_user_vote(user_id: PydanticObjectId, session: AsyncClientSession) -> Vote:
    user = await User.get(user_id, fetch_links=True, session=session)

    if not user:
        raise NotFoundException(f"Could not fetch user vote, user with id {user_id} was not found")

    vote = user.vote

    if not vote:
        raise NotFoundException(f"Could not fetch vote, vote for user with id {user_id} not found")

    return vote