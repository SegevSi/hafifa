import logging
from beanie import PydanticObjectId
from database.models import Vote
from exceptions import AuthorizationException
from repositories import vote_repository
from schemas.token import TokenData
from schemas.vote import VoteResponse, VoteRequest


logger = logging.getLogger(__name__)


def process_vote(vote: Vote) -> VoteResponse:
    return VoteResponse(id=vote.id, dish_id=vote.dish.ref.id, user_id=vote.user.ref.id)


def process_vote_with_links(vote: Vote) -> VoteResponse:
    return VoteResponse(id=vote.id, dish_id=vote.dish.id, user_id=vote.user.id)


async def change_dish(vote_id: PydanticObjectId, dish_id: PydanticObjectId, user_data: TokenData) -> None:
    vote = await vote_repository.get_vote(vote_id)

    if vote.user.ref.id != user_data.user_id:
        raise AuthorizationException(f"Could not change vote with id {vote_id} dish, user {user_data.username} is not authorized")

    await vote_repository.change_dish(vote, dish_id)

    logger.info(f"Vote with id {vote_id} dish was Changed to dish id with id {dish_id}")


async def create_vote(vote: VoteRequest, user_id: PydanticObjectId) -> VoteResponse:
    new_vote = await vote_repository.create_vote(vote.dish_id, user_id)

    logger.info(f"Vote with id {new_vote.id} was created")

    return process_vote_with_links(new_vote)


async def get_vote_by_user(user_id: PydanticObjectId) -> VoteResponse:
    vote = await vote_repository.get_vote_by_user(user_id)

    return process_vote(vote)


async def delete_vote(vote_id: PydanticObjectId) -> None:
    await vote_repository.delete_vote(vote_id)
    logger.info(f"Vote with id {vote_id} was successfully deleted")
