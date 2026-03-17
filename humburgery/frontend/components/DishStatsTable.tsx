"use client"


import { getDishesStatistics, onFetchWithAuthError, getUserVote, postVote, changeVotedDish } from "../utils/api";
import { useMutation, useQuery } from '@tanstack/react-query';
import DishStatsRow from "./DishStatsRow";
import styles from "../styles/DishStatsTable.module.css";
import type {DishStats, Vote} from "../types"


export default function DishStatsTable() {
    const dishesStats = useQuery({
	    queryKey: ['dishesStats'],
	    queryFn: getDishesStatistics,
    });
    
    const currentVote = useQuery({
	    queryKey: ['currentVote'],
	    queryFn: getUserVote,
    });

    const mutateLogin = useMutation({
        mutationFn: postVote,
        onSuccess: (vote: Vote) => {
            
        }
    });

    const selectDish = (dishId: string): void => {
        console.log(dishId)
    };

    if (dishesStats.isError) // todo make it better not like that
        onFetchWithAuthError(dishesStats.error);

    if (currentVote.isError)
        onFetchWithAuthError(currentVote.error);

    
    return (
        <div className={styles.tableContainer}>
            <table className={styles.dishTable}>
                <thead>
                    <tr>
                        <th>מיקום</th>
                        <th>שם המאכל</th>
                        <th>הצבעות</th>
                        <th>כותב המתכון</th>
                        <th>תאריך השקה</th>
                        <th>עודכן לאחרונה</th>
                    </tr>
                </thead>
                <tbody>
                    {dishesStats.isSuccess ? (
                        dishesStats.data.map((dishStats: DishStats, index: number) => // maybe index should be in type? todo
                            <DishStatsRow
                                key={dishStats.id}
                                dishStats={dishStats}
                                selectDish={() => selectDish(dishStats.id)}
                                isSelected={dishStats.id === currentVote.data?.dish_id}
                                place={index + 1}
                            />
                        )
                    ) : (
                        <tr>
                            <td  className="h-24 text-center">
                                No results.
                            </td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    );
}
