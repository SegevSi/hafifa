from fastapi import Depends
from pymongo.asynchronous.database import AsyncDatabase
from database.connection import get_db
from schemas.dish import DishRequest, DishResponse
from repositories import dish_repository
import logging
from database.models.dish import DishModel


logger = logging.getLogger(__name__)


async def create_dish(dish: DishRequest, db: AsyncDatabase = Depends(get_db)) -> DishResponse:
    new_dish = await dish_repository.create_dish(DishModel.model_validate(dish, extra="ignore"), db)
    logger.info(f"Dish with id {dish.id} was created")

    return DishResponse(**new_dish)


async def delete_dish(dish_id: int, db: AsyncDatabase = Depends(AsyncDatabase)):
    pass