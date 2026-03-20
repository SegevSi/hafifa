"use client"

import type { LoginFormInput, Token } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { login } from "@/utils/api";
import { NotFound } from "http-json-errors";
import { useRouter } from 'next/navigation';
import { Routes } from "@/conf";
import { ACCESS_TOKEN_KEY } from "../conf";
import styles from "../styles/LoginForm.module.css";


export default function LoginForm({}) {
    const { register, handleSubmit } = useForm<LoginFormInput>();
    const router = useRouter();
    const mutateLogin = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginFormInput): Promise<Token> => { 
            try {
                return await login(data);
            } catch (error) {
                if (error instanceof NotFound) {
                    throw new Error("invalid credentials");
                } else {
                    throw Error("something went wrong");
                }
            }
        },
        onSuccess: (token: Token) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, `${token.token_type} ${token.access_token}`) 
            router.push(Routes.HOME);
        }
    });
    

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit((data: LoginFormInput): void =>  mutateLogin.mutate(data))}>
            <label htmlFor="username">שם משתמש</label>
            <input id="username" {...register("username", { required: true, maxLength: 20 })} />
            <label htmlFor="password">סיסמה</label>
            <input id="password" type="password" {...register("password", { required: true, maxLength: 20 })} />
            <button type="submit">התחברות</button>
            {mutateLogin.isError && (<div className="text-red-700">{mutateLogin.error.message}</div>)}
        </form>
    );
}