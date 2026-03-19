import { DailyDishesProp } from "@/types";
import styles from "../styles/DailyDishes.module.css";
import { proccesDate } from "../utils/date";
import DishCard from "./DishCard";
import ScrollContainer from "react-indiana-drag-scroll";


export default function DailyDishes({ title, dishes, date }: DailyDishesProp) {


    return (
        <div className={styles.dailyDishes}>
            <div>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>{proccesDate(date)}</div>
            </div>
            <ScrollContainer className={styles.dishesRow}>
                {dishes.map(dish => 
                    <DishCard
                        key={dish.id}
                        {...dish}
                    />
                )}
            </ScrollContainer>
        </div>
    );
}