from database.models import Dish


async def create_dish(dish: Dish) -> Dish:
    return  await Dish.insert_one(dish)
