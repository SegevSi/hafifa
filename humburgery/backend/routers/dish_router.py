from typing import List
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends
from pymongo.asynchronous.client_session import AsyncClientSession
from starlette import status
from database.connection import get_session
from schemas.dish import DishRequest, DishResponse, UpdateDish, DishStatResponse
from services import dish_service
from utlis.oauth2 import get_current_user


router = APIRouter(prefix="/dishes",tags=["dishes"], dependencies=[Depends(get_current_user)])


@router.post("", response_model=DishResponse, status_code=status.HTTP_201_CREATED)
async def create_dish(dish: DishRequest, session: AsyncClientSession = Depends(get_session)) -> DishResponse:
    return await dish_service.create_dish(dish, session)


@router.delete("/{dish_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dish(dish_id: PydanticObjectId, session: AsyncClientSession = Depends(get_session)) -> None:
    await dish_service.delete_dish(dish_id, session)


@router.put("/{dish_id}", response_model=DishResponse, status_code=status.HTTP_202_ACCEPTED)
async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish, session: AsyncClientSession = Depends(get_session)) -> DishResponse:
    return await dish_service.update_dish(dish_id, to_update, session)


@router.get("", response_model=List[DishResponse])
async def get_all_dishes(session: AsyncClientSession = Depends(get_session)) -> List[DishResponse]:
    return await dish_service.get_all_dishes(session)


@router.get("/stats", response_model=List[DishStatResponse])
async def get_all_dishes_for_stats(session: AsyncClientSession = Depends(get_session)) -> List[DishStatResponse]:
    return await dish_service.get_all_dishes_for_stats(session)


