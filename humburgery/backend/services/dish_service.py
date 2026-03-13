from schemas.dish import DishRequest, DishResponse
from repositories import dish_repository
import logging
from database.models import Dish


logger = logging.getLogger(__name__)


async def create_dish(dish: DishRequest) -> DishResponse:
    new_dish = await dish_repository.create_dish(Dish(**dish.model_dump()))
    logger.info(f"Dish with id {dish.id} was created")

    return DishResponse(**new_dish.model_dump())


async def delete_dish(dish_id: int):
    pass