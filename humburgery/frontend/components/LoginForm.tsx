"use client"

import type { LoginFormInput } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { postData } from "@/utils/api";
import { NotFound } from "http-json-errors";
import { useRouter } from "next/navigation";
import { Routes } from "@/conf";

const login = async (data: LoginFormInput) => {
    try {
        return await postData(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data);
    } catch (error) {
        if (error instanceof NotFound) {
            throw new Error("invalid credentials");
        } else {
            throw Error("something went wrong");
        }
    }
};


export default function LoginForm({}) {
    const { register, handleSubmit } = useForm<LoginFormInput>();
    const router = useRouter();
    const mutateLogin = useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: () => router.push(Routes.HOME_ROUTE)
    });
    

    return (
        <form onSubmit={handleSubmit((data: LoginFormInput): void =>  mutateLogin.mutate(data))}>
            <label htmlFor="username">שם משתמש</label>
            <input id="username" {...register("username", { required: true, maxLength: 20 })} />
            <label htmlFor="password">סיסמה</label>
            <input id="password" {...register("password", { required: true, maxLength: 20 })} />
            <input type="submit" value="התחברות"/>
            {mutateLogin.isError && (
                <div className="text-red-700">{mutateLogin.error.message}</div>
            )}
        </form>
    );
}




// async (data: LoginFormInput) => {
//             const response = await fetch(`${}/users/login`, {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: { 'Content-type': 'application/json' },
//             });
            
//             if (response.status === 404)
//                 throw Error("Invalid cradentials");
//             else if (!response.ok)
//                 throw Error();
//         }