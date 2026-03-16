import { LoginFormInput } from '@/types';
import { createError, Unauthorized  } from 'http-json-errors';
import type { AuthFetchOptions } from "../types";
import { ACCESS_TOKEN_KEY } from "../conf";



const login = async (data: LoginFormInput) => {
    const processedData = new URLSearchParams(data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: processedData,
    });

    const resData = await res.json()

    if (!res.ok) {
        throw createError(res.status, resData);
    }

    return resData;
    
};



// const logout = () => {
//   // Clear the token
//   localStorage.removeItem('accessToken');
//   // Redirect to login
//   window.location.href = '/login';
// }; todo
// todo mabye accessToken key should be variable
const fetchWithAuth = async (url: string, options: AuthFetchOptions) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`
        };
        
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, options);
        const resData = await res.json()

        if (!res.ok) {
            throw createError(res.status, resData);
        }

        return resData;
    } else {
        throw new Unauthorized("Access token does not exist")
    }
};
export { login, fetchWithAuth };