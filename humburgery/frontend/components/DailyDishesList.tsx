import { Dish } from "@/types";
import { proccesDishes } from "../utils/dish";
import styles from "../styles/DailyDishesList.module.css";


export default function DailyDishesList({ dishes }: {dishes: Dish[]}) {
    const dailyDishesList = proccesDishes(dishes);

    return (
        <div className={styles.dailyDishesList}>

        </div>
    );
}