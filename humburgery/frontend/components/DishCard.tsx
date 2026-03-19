"use client"


import { deleteDish, onFetchWithAuthError, updateDish } from "../utils/api";
import { useMutation } from '@tanstack/react-query';
import styles from "../styles/DishCard.module.css";
import type { Dish } from "../types"
import { retry, retryDelay} from "../utils/mutation";


export default function DishCard(dish: Dish) {
    const onMutationSuccess = (): void => {
        
    };

    const deleteDishMutation = useMutation({
        mutationFn: deleteDish,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });

    const editDishMutation = useMutation({ // todo onmutate 
        mutationFn: updateDish,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: onMutationSuccess
    });


    return (
        <div className={styles.dishCard}>
            <img src="/images/hamburger" alt="img not found"/>
            <div className={styles.dishCardContent}>
                <div className={styles.name}>{dish.name}</div>
                <div className={styles.description}>{dish.description}</div>
                <div className={styles.buttonsRow}>
                    <button>עריכה</button>
                    <button>מחיקה</button>
                </div>
            </div>
        </div>
    );
}
