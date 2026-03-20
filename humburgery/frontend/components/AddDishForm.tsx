"use client"


import { onFetchWithAuthError, postDish } from "../utils/api";
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import styles from "../styles/AddDishForm.module.css";
import type { Dish, DishRequest, UpdateDish } from "../types"
import { retry, retryDelay} from "../utils/mutation";
import {  addDishLocal } from "../utils/dish";
import { QueryKeys} from "../conf";
import { useToggle } from "@custom-react-hooks/use-toggle";
import DishForm from "./DishForm";


export default function AddDishForm() {
    const queryClient = useQueryClient();
    const {value: isFormOpen, setTrue: openForm, setFalse: closeForm} = useToggle(false);

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


    return (
        <div>
            <button className={styles.addToMenuButton}>
                + הוספה לתפריט
            </button>
            { isFormOpen && (
                <div className={styles.wrapper} >
                    <div className={styles.title}>
                        הוספת מאכל
                    </div>
                    <div className={styles.formContainer}>
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
