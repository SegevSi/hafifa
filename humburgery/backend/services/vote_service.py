import logging

from beanie import PydanticObjectId

from database.models import Vote
from repositories import vote_repository
from schemas.vote import VoteResponse, VoteRequest

logger = logging.getLogger(__name__)


async def change_dish(vote_id: PydanticObjectId, dish_id: PydanticObjectId) -> None:
    await vote_repository.change_dish(vote_id, dish_id)

    logger.info(f"Vote with id {vote_id} dish was Changed to dish id with id {dish_id}")


async def create_vote(vote: VoteRequest, user_id: PydanticObjectId) -> VoteResponse:
    new_vote = await vote_repository.create_vote(vote.dish_id, user_id)

    logger.info(f"Vote with id {new_vote.id} was created")

    return VoteResponse(id=new_vote.id, dish_id=vote.dish_id)


