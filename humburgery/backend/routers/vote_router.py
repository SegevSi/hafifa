from typing import Annotated
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends
from fastapi.params import Body
from starlette import status
from schemas.token import TokenData
from schemas.vote import VoteRequest, VoteResponse
from services import  vote_service
from utlis.oauth2 import get_current_user


router = APIRouter(prefix="/votes", tags=["votes"], dependencies=[Depends(get_current_user)])


@router.post("", status_code=status.HTTP_201_CREATED, response_model=VoteResponse)
async def create_vote(vote: VoteRequest, current_user: TokenData = Depends(get_current_user)) -> VoteResponse:
    return await vote_service.create_vote(vote, current_user.user_id)


@router.patch("/{vote_id}/dish", status_code=status.HTTP_202_ACCEPTED)
async def change_dish(vote_id: PydanticObjectId, dish_id: Annotated[PydanticObjectId, Body(..., embed=True)]):
    await vote_service.change_dish(vote_id, dish_id)

    return {"message": f"Vote with id {dish_id}  dish was changed"}


@router.delete("/{vote_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_vote(vote_id: PydanticObjectId) -> None:
    await vote_service.delete_vote(vote_id)


