from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.params import Body

from database.models import Dish
from utlis.oauth2 import get_current_user

router = APIRouter(prefix="/votes", tags=["votes"], dependencies=[Depends(get_current_user)])

# both use current user
@router.post("")
async def create_vote():
    pass

# only user in vote can change vote dish
@router.patch("/{vote_id}/dish")
async def change_dish(vote_id: int, dish_id: Annotated[str, Body(...)]):
    pass


