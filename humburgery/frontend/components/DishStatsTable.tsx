"use client"


import { getDishesStatistics, onFetchWithAuthError, getUserVote, postVote, changeVotedDish } from "../utils/api";
import { useMutation, useQuery } from '@tanstack/react-query';
import DishStatsRow from "./DishStatsRow";
import styles from "../styles/DishStatsTable.module.css";
import type {DishStats} from "../types"


export default function DishStatsTable() {
    const dishesStats = useQuery({
	    queryKey: ['dishesStats'],
	    queryFn: getDishesStatistics,
    });
    
    const currentVote = useQuery<DishStats>({
	    queryKey: ['currentVote'],
	    queryFn: getUserVote,
    });
  
    return (
        <table className={styles.dishTable}>
            <tr className={styles.dishTableHeader}>
                <th>מיקום</th>
                <th>שם המאכל</th>
                <th>הצבעות</th>
                <th>כותב המתכון</th>
                <th>תאריך השקה</th>
                <th>עודכן לאחרונה</th>
            </tr>

            {}
        </table>
    );
}