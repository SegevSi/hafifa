from datetime import timedelta
from beanie import PydanticObjectId
from config import conf
from exceptions import NotFoundException
from schemas.token import Token
from repositories import user_repository
import logging
from schemas.vote import VoteResponse
from utlis.hash import verify_password
from utlis.jwt import create_access_token


logger = logging.getLogger(__name__)


async def login(username: str, password: str) -> Token:
    user = await user_repository.get_user_by_name(username)

    # if verify_password(password, user.password): passwords in db are not hashed
    if password != user.password:
        raise NotFoundException("Incorrect password")

    access_token_expires = timedelta(minutes=conf["jwt"]["ACCESS_TOKEN_EXPIRE_MINUTES"])
    access_token = create_access_token(
        data={"sub": user.name, "user_id": str(user.id)}, expires_delta=access_token_expires
    )
    logger.info(f"User with id {user.id} logged in successfully")

    return Token(access_token=access_token, token_type="bearer")


async def get_user_vote(user_id: PydanticObjectId) -> VoteResponse:
    vote = await user_repository.get_user_vote(user_id)
    logger.info(f"Fetched vote for user with id {user_id} successfully")

    return VoteResponse(id=vote.id, dish_id=vote.dish.id)





