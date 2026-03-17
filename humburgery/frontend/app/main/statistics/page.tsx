import DishStatsTable from "../../../components/DishStatsTable";

export default function Statistics() {
  
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col">
                <p className="text-xl">המאכל הכי אכיל</p>
                <DishStatsTable/>
            </div>
        </div>
    );
}