from schemas.dish import DishRequest, DishResponse, UpdateDish
from repositories import dish_repository
import logging
from database.models import Dish
from beanie import PydanticObjectId


logger = logging.getLogger(__name__)


async def create_dish(dish: DishRequest) -> DishResponse:
    new_dish = await dish_repository.create_dish(Dish(**dish.model_dump()))
    logger.info(f"Dish with id {new_dish.id} was created")

    return DishResponse.model_validate(new_dish)


async def delete_dish(dish_id: PydanticObjectId):
    await dish_repository.delete_dish(dish_id)
    logger.info(f"Dish with id {dish_id} was deleted")


async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish) -> DishResponse:
    updated_dish = await dish_repository.update_dish(dish_id, to_update)
    logger.info(f"Dish with id {dish_id} was updated")

    return DishResponse.model_validate(updated_dish)