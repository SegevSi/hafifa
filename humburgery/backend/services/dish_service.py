from typing import List
from pymongo.asynchronous.client_session import AsyncClientSession
from schemas.dish import DishRequest, DishResponse, UpdateDish, DishStatResponse
from repositories import dish_repository
import logging
from database.models import Dish
from beanie import PydanticObjectId


logger = logging.getLogger(__name__)


async def create_dish(dish: DishRequest, session: AsyncClientSession) -> DishResponse:
    new_dish = await dish_repository.create_dish(Dish(**dish.model_dump()), session)
    logger.info(f"Dish with id {new_dish.id} was created")

    return DishResponse.model_validate(new_dish)


async def delete_dish(dish_id: PydanticObjectId, session: AsyncClientSession):
    await dish_repository.delete_dish(dish_id, session)
    logger.info(f"Dish with id {dish_id} was deleted")


async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish, session: AsyncClientSession) -> DishResponse:
    updated_dish = await dish_repository.update_dish(dish_id, to_update, session)
    logger.info(f"Dish with id {dish_id} was updated")

    return DishResponse.model_validate(updated_dish)


async def get_all_dishes(session: AsyncClientSession) -> List[DishResponse]:
    dishes = await dish_repository.get_all_dishes(session)
    logger.info(f"Successfully fetched all dishes")

    return [DishResponse.model_validate(dish) for dish in dishes]


async def get_all_dishes_for_stats(session: AsyncClientSession) -> List[DishStatResponse]:
    dishes = await dish_repository.get_all_dishes_for_stats(session)
    logger.info(f"Successfully fetched all dishes stats")

    return [DishStatResponse.model_validate(dish) for dish in dishes]
