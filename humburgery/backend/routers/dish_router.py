from fastapi import APIRouter, Depends
from fastapi.params import Query
from pymongo.asynchronous.database import AsyncDatabase
from starlette import status

from database.connection import get_db
from schemas.dish import DishRequest, DishResponse
from services import dish_service
from utlis.oauth2 import get_current_user

router = APIRouter(prefix="/dishes",tags=["dishes"], dependencies=[Depends(get_current_user)])


@router.post("", response_model=DishResponse, status_code=status.HTTP_201_CREATED)
async def create_dish(dish: DishRequest, db: AsyncDatabase = Depends(get_db)) -> DishResponse:
    return await dish_service.create_dish(dish, db)


@router.get("")
async def get_all_dishes(for_stats: bool = Query(default=False)):
    pass


@router.delete("/{dish_id}")
async def delete_dish(dish_id: int):
    pass


@router.put("/{dish_id}")
async def update_dish(dish_id: int):
    pass
