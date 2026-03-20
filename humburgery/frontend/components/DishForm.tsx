"use client"

import type { DishFormProps, DishRequest } from "@/types";
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/DishForm.module.css";
import { proccesOptions } from "../utils/option";
import Select from 'react-select';
import { DaysData  } from "../conf";


export default function LoginForm({ isSubmitionError, defaultDish, onSubmit, onClose, submitButtonText} : DishFormProps) {
    const { register, handleSubmit, control  } = useForm<DishRequest>({
        shouldUnregister: true, 
        defaultValues: defaultDish ? defaultDish : {} 
    });
    
    return (
        <form className={styles.dishForm} onSubmit={handleSubmit((data: DishRequest): void => onSubmit(data))}>
            <div className={styles.field}>
                <label htmlFor="name">שם מוצר</label>
                <input id="name" {...register("name", { required: true, maxLength: 20 })} />
            </div>
            <div className={styles.field}>
                <label htmlFor="price">מחיר</label>
                <input id="price" type="number" {...register("price", { required: true, min: 0, valueAsNumber: true })} />
            </div>
            <div className={styles.field}>
                <label htmlFor="creator">יוצר המתכון</label>
                <input id="creator" {...register("creator", { required: true, maxLength: 20 })} />
            </div>
            <div className={styles.field}>
                <label htmlFor="day">יום</label>
                <Controller
                    name="day_of_week"
                    rules={{required: true}}
                    control={control}
                    render={({ field }) => (
                    <Select
                        placeholder=""
                        options={proccesOptions(DaysData.DAYS)}
                        onChange={(({ value }) => field.onChange(value))}
                    />
                    )}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="description">תיאור</label>
                <textarea id="description" rows={4} {...register("description", { required: true, maxLength: 200 })}></textarea>
            </div>
            <div className={styles.buttons}>
                <button className={styles.submitButton} type="submit">{submitButtonText}</button>
                <button className={styles.exitButton} onClick={onClose}>ביטול</button>
                {isSubmitionError && (<div className="text-red-700">Something went wrong</div>)}
            </div>
        </form>
    );
}