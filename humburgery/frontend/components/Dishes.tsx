"use client"


import { geAllDishes, onFetchWithAuthError, postDish } from "../utils/api";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DailyDishesList from "./DailyDishesList";
import { QueryKeys } from "../conf";
import styles from "../styles/Dishes.module.css";
import type { Dish, DishRequest } from "../types"
import { retry, retryDelay} from "../utils/mutation";
import {  addDishLocal } from "../utils/dish";
import { useToggle } from "@custom-react-hooks/use-toggle";
import DishForm from "./DishForm";


export default function Dishes() {
    const queryClient = useQueryClient();
    const {value: isFormOpen, setTrue: openForm, setFalse: closeForm} = useToggle(false);

    const dishes = useQuery({
	    queryKey: QueryKeys.GET_ALL_DISHES,
	    queryFn: geAllDishes,
    });

    const postDishMutation = useMutation({  
        mutationFn: postDish,
        onError: onFetchWithAuthError,
        retry: retry,
        retryDelay: retryDelay,
        onSuccess: async (newDish: Dish) => {
            await queryClient.cancelQueries({queryKey: QueryKeys.GET_ALL_DISHES});

            queryClient.setQueryData(QueryKeys.GET_ALL_DISHES, (old: Dish[]) => addDishLocal(old, newDish));
            closeForm();
        }
    });
    
    if (dishes.isError) // todo make it better not like that
        onFetchWithAuthError(dishes.error);

    return (
        <div className={styles.dishes}>
            {dishes.isError && (<p className="text-red-700 text-8xl" >Something went wrong</p>)}
            {dishes.isSuccess && (
                <DailyDishesList 
                    dishes={dishes.data}
                />
            )}
            <button className={styles.addToMenuButton} onClick={openForm}>
                + הוספה לתפריט
            </button>
            { isFormOpen && (
                <div className={styles.formContainer} >
                    <div className={styles.title}>
                        הוספת מאכל
                    </div>
                    <div className={styles.wrapper}>
                        <DishForm
                            isSubmitionError={postDishMutation.isError}
                            onSubmit={(dish: DishRequest):void => postDishMutation.mutate(dish)}
                            onClose={closeForm}
                            submitButtonText="הוספת מאכל"
                            defaultDish={null}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
