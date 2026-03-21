"use client"


import { getDishesStatistics, onFetchWithAuthError, getUserVote, postVote, changeVotedDish, deleteVote } from "../utils/api";
import { useMutation, useQuery } from '@tanstack/react-query';
import DishStatsRow from "./DishStatsRow";
import styles from "../styles/DishStatsTable.module.css";
import type { DishStats } from "../types"
import { NotFound } from "http-json-errors";
import { retry, retryDelay} from "../utils/mutation";
import { QueryKeys } from "../conf";


export default function DishStatsTable() {
    const dishesStats = useQuery({
	    queryKey: QueryKeys.GET_DISHES_STATS, 
	    queryFn: getDishesStatistics,
        retry: retry,
        retryDelay: retryDelay,
    });
    
    const currentVote = useQuery({
	    queryKey: QueryKeys.GET_USER_VOTE,
	    queryFn: getUserVote,
        retry: retry,
        retryDelay: retryDelay,
    });

    const onMutationSuccess = (): void => {
        dishesStats.refetch();
        currentVote.refetch();
    };

    const postVoteMutation = useMutation({
        mutationFn: postVote,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const changeVotedDishMutation = useMutation({ 
        mutationFn: changeVotedDish,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const deleteVoteMutation = useMutation({ 
        mutationFn: deleteVote,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const onClickDishStatsRow = (dishId: string): void => {
        if (currentVote.error instanceof NotFound) {
            postVoteMutation.mutate(dishId)
        } else if (currentVote.isSuccess) {
            if (currentVote.data.dish_id !== dishId) {
                changeVotedDishMutation.mutate({dishId, voteId: currentVote.data.id});
            } else {
                deleteVoteMutation.mutate(currentVote.data.id);
            }
        }
    };

    if (dishesStats.isError) 
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
                    {dishesStats.isSuccess && (
                        dishesStats.data.map((dishStats: DishStats, index: number) => 
                            <DishStatsRow
                                key={dishStats.id}
                                dishStats={dishStats}
                                selectDish={() => onClickDishStatsRow(dishStats.id)}
                                isSelected={currentVote.isSuccess ? dishStats.id === currentVote.data.dish_id : false}
                                place={index + 1}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}