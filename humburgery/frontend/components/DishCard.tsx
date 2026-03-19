"use client"


import { deleteDish, onFetchWithAuthError, updateDish } from "../utils/api";
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import styles from "../styles/DishCard.module.css";
import type { Dish, UpdateDish } from "../types"
import { retry, retryDelay} from "../utils/mutation";
import { deleteDishLocal, updateDishLocal } from "../utils/dish";
import { QueryKeys} from "../conf";


export default function DishCard(dish: Dish) {
    const queryClient = useQueryClient();
    
    const deleteDishMutation = useMutation({
        mutationFn: async (): Promise<void> =>  {
            await deleteDish(dish.id);
            
        },
        onError: onFetchWithAuthError,
        retryDelay: retryDelay,
        onSuccess: async (): Promise<void> => {
            await queryClient.cancelQueries({queryKey: QueryKeys.GET_ALL_DISHES});
            console.log("in");
            queryClient.setQueryData(QueryKeys.GET_ALL_DISHES, (old: Dish[]) => deleteDishLocal(old, dish.id));
        },
    });

    const editDishMutation = useMutation({  
        mutationFn: async (toUpdateDish: UpdateDish): Promise<Dish> => {
            return await updateDish({dish_id: dish.id, updateDish: toUpdateDish});
        },
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: async (updatedDish: Dish) => {
            await queryClient.cancelQueries({queryKey: QueryKeys.GET_ALL_DISHES});

            queryClient.setQueryData(QueryKeys.GET_ALL_DISHES, (old: Dish[]) => updateDishLocal(old, updatedDish));
        }
    });


    return (
        <div className={styles.dishCard}>
            <img src="/images/hamburger.jfif" alt="img not found"/>
            <div className={styles.dishCardContent}>
                <div className={styles.name}>{dish.name}</div>
                <div className={styles.description}>{dish.description}</div>
                <div className={styles.buttonsRow}>
                    <button>עריכה</button>
                    <button
                        onClick={() => deleteDishMutation.mutate()}
                    >
                        מחיקה
                    </button>
                </div>
            </div>
        </div>
    );
}
