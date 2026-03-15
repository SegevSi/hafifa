from beanie import PydanticObjectId
from pymongo.asynchronous.client_session import AsyncClientSession
from database.models import Vote, Dish, User
from exceptions import NotFoundException, ConflictException
from pymongo.errors import DuplicateKeyError


async def change_dish(vote_id: PydanticObjectId, dish_id: PydanticObjectId, session: AsyncClientSession) -> None:
    vote = await Vote.get(vote_id, session=session)

    if not vote:
        raise NotFoundException(f"Could not Change Vote dish, vote with id {vote_id} not found")

    dish = await Dish.get(dish_id, session=session)

    if not dish:
        raise NotFoundException(f"Could not Change vote dish, dish with id {dish_id} not found")

    vote.dish = dish

    await vote.save(session=session)


async def create_vote(dish_id: PydanticObjectId, user_id: PydanticObjectId, session: AsyncClientSession) -> Vote:
    user = await User.get(user_id, session=session)

    if not user:
        raise NotFoundException(f"Could not Create Vote, user with id {user_id} not found")

    dish = await Dish.get(dish_id, session=session)

    if not dish:
        raise NotFoundException(f"Could not Create Vote, dish with id {dish_id} not found")

    new_vote = Vote(user=user, dish=dish)

    try:
        return await Vote.insert_one(new_vote, session=session)
    except DuplicateKeyError:
        raise ConflictException(f"Could not create new Vote, user with id {str(user_id)}  already voted")


