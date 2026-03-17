import DishStatsTable from "../../../components/DishStatsTable";

export default function Statistics() {
  
    return (
        <div className="flex justify-center items-center">
            <p className="text-xl">המאכל הכי אכיל</p>
            <DishStatsTable/>
        </div>
    );
}