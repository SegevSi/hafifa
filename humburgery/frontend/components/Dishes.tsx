"use client"


import { geAllDishes, onFetchWithAuthError } from "../utils/api";
import { useQuery } from '@tanstack/react-query';
import DailyDishesList from "./DailyDishesList";


export default function Dishes() {
    const dishes = useQuery({
	    queryKey: ['dishes'], // todo make  var
	    queryFn: geAllDishes,
    });
    

    if (dishes.isError) // todo make it better not like that
        onFetchWithAuthError(dishes.error);

    return (
        <>
            {dishes.isError && (<p className="text-red-700 text-8xl" >Something went wrong</p>)}
            {dishes.isSuccess && (
                <DailyDishesList 
                    dishes={dishes.data}
                />
            )}
        </>
    );
}
