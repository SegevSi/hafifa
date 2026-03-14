from beanie import PydanticObjectId
from fastapi import APIRouter, Depends
from fastapi.params import Query
from starlette import status
from schemas.dish import DishRequest, DishResponse, UpdateDish
from services import dish_service
from utlis.oauth2 import get_current_user


router = APIRouter(prefix="/dishes",tags=["dishes"], dependencies=[Depends(get_current_user)])


@router.post("", response_model=DishResponse, status_code=status.HTTP_201_CREATED)
async def create_dish(dish: DishRequest) -> DishResponse:
    return await dish_service.create_dish(dish)


@router.get("")
async def get_all_dishes(for_stats: bool = Query(default=False)):
    pass


@router.delete("/{dish_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dish(dish_id: PydanticObjectId):
    return await dish_service.delete_dish(dish_id)


@router.put("/{dish_id}", response_model=DishResponse, status_code=status.HTTP_202_ACCEPTED)
async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish) -> DishResponse:
    return await dish_service.update_dish(dish_id, to_update)
