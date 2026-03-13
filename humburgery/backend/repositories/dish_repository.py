from database.models import Dish
from exceptions import NotFoundException


async def create_dish(dish: Dish) -> Dish:
    return  await Dish.insert_one(dish)


async def delete_dish(dish_id: str) -> None:
    dish = await Dish.get(dish_id)

    if not dish:
        raise NotFoundException(f"Could not delete dish, dish with id {dish_id} was not found")

    await dish.delete()