import { Dish } from "@/types";
import { proccesDishes } from "../utils/dish";
import styles from "../styles/DailyDishesList.module.css";
import DailyDishes from "./DailyDishes";


export default function DailyDishesList({ dishes }: {dishes: Dish[]}) {
    const dailyDishesList = proccesDishes(dishes);

    return (
        <div className={styles.dailyDishesList}>
            {dailyDishesList.map(dailyDishes =>
                <DailyDishes
                    key={dailyDishes.date.toDateString()}
                    title={dailyDishes.title}
                    date={dailyDishes.date}
                    dishes={dailyDishes.dishes}
                />
            )}
        </div>
    );
}