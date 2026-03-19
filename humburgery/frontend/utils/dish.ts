import type { Dish, DailyDishesProp, UpdateDish, DishRequest } from "../types";
import { DaysData } from "@/conf";


const addDish = (oldDishes: Dish[], newDish: Dish): Dish[] => {
    return [...oldDishes, newDish];
};


const deleteDish = (oldDishes: Dish[], dish_id: string): Dish[] => {
    return oldDishes.filter(dish => dish.id !== dish_id);
};


const updateDish = (oldDishes: Dish[], updatedDish: Dish): Dish[] => {
    return oldDishes.map(dish => {
        if (updatedDish.id !== dish.id)
            return dish;

        return updatedDish;
    });
};


const getGroupedDishesByDayOfWeek = (dishes: Dish[]): Dish[][] => {
    const dishesByDayOfWeek: Dish[][] = new Array(DaysData.DAYS.length).fill([]);

    dishes.forEach(dish => {
        dishesByDayOfWeek[dish.day_of_week].push(dish);
    });

    return dishesByDayOfWeek;
};


const proccesDishes = (dishes: Dish[]): DailyDishesProp[] => {
    const dishesByDayOfWeek = getGroupedDishesByDayOfWeek(dishes);

    const currDate = new Date();
    const dailyDishesArr = [];
    const todayDishes = {
        title: `${DaysData.TODAY}, ${DaysData.DAYS[currDate.getDay()]}`,
        date: new Date(currDate),
        dishes: dishesByDayOfWeek[currDate.getDay()]
    };
    dailyDishesArr.push(todayDishes);

    for (let index = 0; index < DaysData.DAYS.length - 1; index++) {
        currDate.setDate(currDate.getDate() + 1);

        dailyDishesArr.push({
            title: DaysData.DAYS[currDate.getDay()],
            date: new Date(currDate),
            dishes: dishesByDayOfWeek[currDate.getDay()]
        });
    }

    return dailyDishesArr;
};


const proccesDishForUpdate = (oldDish: Dish, newDish: DishRequest): UpdateDish => {
    const updateDish: UpdateDish = {};

    let key: keyof DishRequest;

    for (key in newDish) {
        if (oldDish[key] !== newDish[key])
            Object.assign(updateDish, {key: newDish[key]});
    } 

    return updateDish;
};

export {
    addDish,
    deleteDish,
    updateDish,
    proccesDishes,
    proccesDishForUpdate,
};


