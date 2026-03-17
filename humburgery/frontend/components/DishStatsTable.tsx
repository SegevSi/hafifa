"use client"


import { getDishesStatistics, onFetchWithAuthError, getUserVote, postVote, changeVotedDish } from "../utils/api";
import { useMutation, useQuery } from '@tanstack/react-query';
import DishStatsRow from "./DishStatsRow";
import styles from "../styles/DishStatsTable.module.css";


export default function DishStatsTable() {
  
    return (
        <table className={styles.}>
            <tr className="bg-color">
                <th>מיקום</th>
                <th>שם המאכל</th>
                <th>הצבעות</th>
                <th>כותב המתכון</th>
                <th>תאריך השקה</th>
                <th>עודכן לאחרונה</th>
            </tr>
        </table>
    );
}