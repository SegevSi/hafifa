"use client"

import type { DishFormProps, DishRequest } from "@/types";
import { useForm } from "react-hook-form";
import styles from "../styles/LoginForm.module.css";


export default function LoginForm(props : DishFormProps) {
    const { register, handleSubmit } = useForm<DishRequest>();
    
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit((data: DishRequest): void =>  props.onSubmit(data))}>
            <label htmlFor="username">שם משתמש</label>
            <input id="username" {...register("username", { required: true, maxLength: 20 })} />
            <label htmlFor="password">סיסמה</label>
            <input id="password" type="password" {...register("password", { required: true, maxLength: 20 })} />
            <button type="submit">התחברות</button>
            {mutateLogin.isError && (<div className="text-red-700">{mutateLogin.error.message}</div>)}
        </form>
    );
}