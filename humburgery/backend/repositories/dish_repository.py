from fastapi import Depends
from pymongo.asynchronous.database import AsyncDatabase
from database.connection import get_db
from database.models.dish import DishModel



async def create_dish(dish: DishModel, db: AsyncDatabase = Depends(get_db)) -> DishModel:
    new_dish = dish.model_dump(by_alias=True, exclude=set(["id"]))
    result = await db["dishes"].insert_one(new_dish)
    new_dish["_id"] = result.inserted_id

    return DishModel(**new_dish)