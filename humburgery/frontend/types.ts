
type LoginFormInput = {
    username: string;
    password: string;
}

interface AuthFetchOptions {
    headers: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type BaseDish = {
    id: string;
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

export type { LoginFormInput, AuthFetchOptions, HttpMethod, DishStats, DishStatsRowProps, Token };