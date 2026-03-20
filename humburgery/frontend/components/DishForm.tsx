"use client"

import type { DishFormProps, DishRequest } from "@/types";
import { useForm } from "react-hook-form";
import styles from "../styles/DishForm.module.css";
import { proccesOptions } from "../utils/option";
import Select from 'react-select';
import { DaysData  } from "../conf";


export default function LoginForm({ isSubmitionError, defaultDish, onSubmit, onClose, submitButtonText} : DishFormProps) {
    const { register, handleSubmit } = useForm<DishRequest>({
        shouldUnregister: true, 
        defaultValues: defaultDish ? defaultDish : {} 
    });
    
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit((data: DishRequest): void => onSubmit(data))}>
            <label htmlFor="name">שם מוצר</label>
            <input id="name" {...register("name", { required: true, maxLength: 20 })} />
            <label htmlFor="price">מחיר</label>
            <input id="price" type="number" {...register("price", { required: true, min: 0 })} />
            <label htmlFor="creator">יוצר המתכון</label>
            <input id="creator" {...register("creator", { required: true, maxLength: 20 })} />
            <label htmlFor="day">יום</label>
            <Select id="day" options={proccesOptions(DaysData.DAYS)} {...register("day_of_week", { required: true})} />
            <label htmlFor="description">תיאור</label>
            <textarea id="description" {...register("description", { required: true, maxLength: 20 })}></textarea>
            <div className={styles.dishForm}>
                <button className={styles.submitButton} type="submit">{submitButtonText}</button>
                <button onClick={onClose}>ביטול</button>
                {isSubmitionError && (<div className="text-red-700">Something went wrong</div>)}
            </div>
        </form>
    );
}