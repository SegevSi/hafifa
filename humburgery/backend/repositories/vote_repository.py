from beanie import PydanticObjectId
from beanie.odm.operators.update.general import Set
from database.models import Vote, Dish, User
from exceptions import NotFoundException, ConflictException
from pymongo.errors import DuplicateKeyError


async def change_dish(vote_id: PydanticObjectId, dish_id: PydanticObjectId) -> None:
    vote = await Vote.get(vote_id)

    if not vote:
        raise NotFoundException(f"Could not Change Vote dish, vote with id {vote_id} not found")

    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not Change vote dish, dish with id {dish_id} not found")

    await vote.update(Set({Vote.dish.ref: dish}))


async def create_vote(dish_id: PydanticObjectId, user_id: PydanticObjectId) -> Vote:
    user = await User.get(user_id)

    if not user:
        raise NotFoundException(f"Could not Create Vote, user with id {user_id} not found")

    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not Create Vote, dish with id {dish_id} not found")

    new_vote = Vote(user=user, dish=dish)

    try:
        return await Vote.insert_one(new_vote)
    except DuplicateKeyError:
        raise ConflictException(f"Could not create new Vote, user with id {str(user_id)}  already voted")


async def get_user_vote(user_id: PydanticObjectId) -> Vote:
    vote = await Vote.find_one(Vote.user.ref.id == user_id)

    if not vote:
        raise NotFoundException(f"Could not fetch vote, vote for user with id {user_id} not found")

    return vote