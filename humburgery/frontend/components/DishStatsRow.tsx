import type { DishStatsRowProps } from "../types";

export default function DishStatsRow({dishStats, selectDish, isSelected, place}: DishStatsRowProps) {
  
    return (
        <tr
            className={isSelected ? "bg-gray-300" : ""}
            onClick={selectDish}
        >
            <td>{place}</td>
            <td>{dishStats.name}</td>
            <td>{dishStats.votes}</td>
            <td>{dishStats.creator}</td>
            <td>{dishStats.created_at}</td>
            <td>{dishStats.updated_at}</td>
        </tr>
    );
}