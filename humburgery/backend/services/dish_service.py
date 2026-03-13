from schemas.dish import DishRequest, DishResponse
from repositories import dish_repository
import logging
from database.models import Dish


logger = logging.getLogger(__name__)


async def create_dish(dish: DishRequest) -> DishResponse:
    new_dish = await dish_repository.create_dish(Dish(**dish.model_dump()))
    logger.info(f"Dish with id {str(new_dish.id)} was created")

    return DishResponse.model_validate(new_dish, by_name=True)


async def delete_dish(dish_id: int):
    pass