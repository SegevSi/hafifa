"use client"


import { getDishesStatistics, onFetchWithAuthError, getUserVote, postVote, changeVotedDish } from "../utils/api";
import { useMutation, useQuery } from '@tanstack/react-query';
import DishStatsRow from "./DishStatsRow";
import styles from "../styles/DishStatsTable.module.css";
import type {DishStats, Vote} from "../types"
import { NotFound } from "http-json-errors";
import { retry, retryDelay} from "../utils/mutation";


export default function DishStatsTable() {
    const dishesStats = useQuery({
	    queryKey: ['dishesStats'],
	    queryFn: getDishesStatistics,
    });
    
    const currentVote = useQuery({
	    queryKey: ['currentVote'],
	    queryFn: getUserVote,
    });

    const onMutationSuccess = (): void => {
        dishesStats.refetch();
        currentVote.refetch();
    };

    const mutateVote = useMutation({
        mutationKey: ['postVote'],
        mutationFn: postVote,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const mutateVoteDish = useMutation({
        mutationKey: ['changeVoteDish'],
        mutationFn: changeVotedDish,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const selectDish = (dishId: string): void => {
        if (currentVote.error instanceof NotFound) {
            mutateVote.mutate(dishId)
        } else if (currentVote.isSuccess) {
            mutateVoteDish.mutate({dishId, voteId: currentVote.data.id})
        }
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
