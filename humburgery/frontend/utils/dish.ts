import type { Dish, DailyDishesProp } from "../types";
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


const proccesDishes = (dishes: D)



export {
    addDish,
    deleteDish,
    updateDish,
};


