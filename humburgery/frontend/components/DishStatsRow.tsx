import type { DishStatsRowProps } from "../types";

export default function DishStatsRow({dishStats, selectDish, isSelected, place}: DishStatsRowProps) {
  
    return (
        <tr
            className={isSelected ? "bg-gray-800" : ""}
            onClick={selectDish}
        >
            <td>{place}</td>
            <td>{dishStats.name}</td>
            <td>{dishStats.votes}</td>
            <td>{dishStats.creator}</td>
            <td>{new Date(dishStats.created_at).toDateString()}</td>
            <td>{new Date(dishStats.updated_at).toDateString()}</td>
        </tr>
    );
}