from typing import List
from beanie import DeleteRules, PydanticObjectId
from pymongo.asynchronous.client_session import AsyncClientSession
from database.models import Dish, Vote, DishStatsDTO
from exceptions import NotFoundException
from schemas.dish import UpdateDish
from utlis import pydantic_encoder


async def create_dish(dish: Dish, session: AsyncClientSession) -> Dish:
    return  await Dish.insert_one(dish, session=session)


async def delete_dish(dish_id: PydanticObjectId, session: AsyncClientSession) -> None:
    dish = await Dish.find_one({"_id": dish_id}, fetch_links=True, nesting_depth=2)

    if not dish:
        raise NotFoundException(f"Could not delete dish, dish with id {dish_id} was not found")

    await dish.delete(link_rule=DeleteRules.DELETE_LINKS, session=session)


async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish, session: AsyncClientSession) -> Dish:
    dish = await Dish.get(dish_id, session=session)

    if not dish:
        raise NotFoundException(f"Could not update dish, dish with id {dish_id} was not found")

    update_encoded_data = pydantic_encoder.encode_input(to_update)
    _ = await dish.update({"$set": update_encoded_data}, session=session)
    updated_dish = await Dish.get(dish_id, session=session)

    return updated_dish


async def get_all_dishes(session: AsyncClientSession) -> List[Dish]:
    return await Dish.find_all(session=session).to_list()


async def get_all_dishes_for_stats(session: AsyncClientSession) -> List[DishStatsDTO]:
    lookup = {
        "$lookup":  {
            "from": Vote.Settings.name,
            "localField": "_id",
            "foreignField": "dish.$id",
            "as": "votes"
        }
    }

    project = {
        "$project": {
            "_id": 1,
            "votes":{ "$size" :"$votes"},
            "name": 1,
            "creator": 1,
            "created_at": 1,
            "updated_at":1
        }
    }

    sort = { "$sort": { "votes" : -1 } }

    aggregation_pipeline = [lookup, project, sort]

    return await Dish.aggregate(aggregation_pipeline, projection_model=DishStatsDTO, session=session).to_list()

