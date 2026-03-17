from typing import List
from beanie import DeleteRules, PydanticObjectId
from database.models import Dish, Vote, DishStatsDTO
from exceptions import NotFoundException
from schemas.dish import UpdateDish
from utlis import pydantic_encoder


async def create_dish(dish: Dish) -> Dish:
    return  await Dish.insert_one(dish)


async def delete_dish(dish_id: PydanticObjectId) -> None:
    dish = await Dish.find_one({"_id": dish_id}, fetch_links=True, nesting_depth=1)

    if not dish:
        raise NotFoundException(f"Could not delete dish, dish with id {dish_id} was not found")

    await dish.delete(link_rule=DeleteRules.DELETE_LINKS)


async def update_dish(dish_id: PydanticObjectId, to_update: UpdateDish) -> Dish:
    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not update dish, dish with id {dish_id} was not found")

    update_encoded_data = pydantic_encoder.encode_input(to_update)
    _ = await dish.update({"$set": update_encoded_data})
    updated_dish = await Dish.get(dish_id)

    return updated_dish


async def get_all_dishes() -> List[Dish]:
    return await Dish.find_all().to_list()


async def get_all_dishes_for_stats() -> List[DishStatsDTO]:
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

    return await Dish.aggregate(aggregation_pipeline, projection_model=DishStatsDTO).to_list()

