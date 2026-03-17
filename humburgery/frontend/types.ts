type Item = {
    id: string;
}

type LoginFormInput = {
    username: string;
    password: string;
}

interface AuthFetchOptions {
    headers: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type BaseDish = Item &{
    name: string;
    creator: string;
};

type Token = {
    access_token: string;
    token_type: string
};

type DishStats = BaseDish & {
    votes: number;
    created_at: string;
    updated_at: string;
};

type DishStatsRowProps = {
    dishStats: DishStats;
    selectDish: () => void;
    isSelected: boolean;
    place: number;
};

type Vote = Item & {
    dish_id: string;
    user_id: string;
};

type Dish = BaseDish & {
    price: number;
    day_of_week: number;
    description: string;
};


export type { 
    LoginFormInput, 
    AuthFetchOptions, 
    HttpMethod, 
    DishStats, 
    DishStatsRowProps, 
    Token, 
    Vote, 
    Dish, 
};