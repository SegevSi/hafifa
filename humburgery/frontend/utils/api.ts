import { LoginFormInput } from '@/types';
import { createError, Unauthorized  } from 'http-json-errors';
import type { AuthFetchOptions, DishStats, HttpMethod, Token, Vote, Dish } from "../types";
import { ACCESS_TOKEN_KEY } from "../conf";
import { logout } from './navigation';




const login = async (data: LoginFormInput): Promise<Token> => {
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


const fetchWithAuth = async (url: string, options: AuthFetchOptions) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        options.headers = {
            ...options.headers,
            'Authorization': accessToken
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


const onFetchWithAuthError = (error: Error) => {
    if (error instanceof Unauthorized) {
        logout()
    } else {
        throw error;
    }
}; 


const apiRequest = async (url: string, method: HttpMethod, body: object | null = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },    
    }

    if (method !== "GET" && body) {
        const optionsWithBody = {...options, body: JSON.stringify(body)};

        return await fetchWithAuth(url, optionsWithBody);
    } else if (method === "GET") {
        return await fetchWithAuth(url, options);
    } else {
        throw new Error(`Cannot fetch with method: ${method} and body: ${body}`);
    }
};


const getDishesStatistics = async (): Promise<DishStats[]> => {
    return await apiRequest("/dishes/stats", "GET");
};


const getUserVote = async (): Promise<Vote> => {
    return await apiRequest("/users/vote", "GET");
};


const postVote = async (dishId: number): Promise<Vote> => {
    return await apiRequest("/votes", "POST", {dish_id : dishId});
};


const changeVotedDish = async (dishId: number, voteId: number): Promise<void> => {
    await apiRequest(`/votes/${voteId}`, "PATCH", {dish_id : dishId});
};


const geAllDishes = async (): Promise<Dish> => {
    return await apiRequest("/dishes", "GET");
};

export { 
    login, 
    fetchWithAuth, 
    onFetchWithAuthError, 
    getDishesStatistics, 
    getUserVote,
    postVote,
    changeVotedDish,
    geAllDishes,
};