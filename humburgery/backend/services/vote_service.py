import logging
from beanie import PydanticObjectId

from exceptions import AuthorizationException
from repositories import vote_repository
from schemas.token import TokenData
from schemas.vote import VoteResponse, VoteRequest


logger = logging.getLogger(__name__)


async def change_dish(vote_id: PydanticObjectId, dish_id: PydanticObjectId, user_data: TokenData) -> None:
    vote = await vote_repository.get_vote(vote_id)

    if vote.user.id != user_data.user_id:
        raise AuthorizationException(f"Could not change vote with id {vote_id} dish, user {user_data.username} is not authorized")

    await vote_repository.change_dish(vote, dish_id)

    logger.info(f"Vote with id {vote_id} dish was Changed to dish id with id {dish_id}")


async def create_vote(vote: VoteRequest, user_id: PydanticObjectId) -> VoteResponse:
    new_vote = await vote_repository.create_vote(vote.dish_id, user_id)

    logger.info(f"Vote with id {new_vote.id} was created")

    return VoteResponse(id=new_vote.id, dish_id=vote.dish_id, user_id=user_id)


