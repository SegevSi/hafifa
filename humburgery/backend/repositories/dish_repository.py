from database.models import Dish
from exceptions import NotFoundException
from schemas.dish import UpdateDish
from utlis import pydantic_encoder


async def create_dish(dish: Dish) -> Dish:
    return  await Dish.insert_one(dish)


async def delete_dish(dish_id: str) -> None:
    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not delete dish, dish with id {dish_id} was not found")

    await dish.delete()


async def update_dish(dish_id: str, to_update: UpdateDish) -> Dish:
    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not update dish, dish with id {dish_id} was not found")

    update_encoded_data = pydantic_encoder.encode_input(to_update)
    _ = await dish.update({"$set": update_encoded_data})
    updated_dish = await Dish.get(dish_id)

    return updated_dish
