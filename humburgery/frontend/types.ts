type ResponseItem = {
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

type BaseDish = ResponseItem & {
    name: string;
    creator: string;
};

type Token = {
    access_token: string;
    token_type: string
};

type DishStats = BaseDish & ResponseItem & {
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

type Vote = ResponseItem & {
    dish_id: string;
    user_id: string;
};

type DishRequest = BaseDish & {
    price: number;
    day_of_week: number;
    description: string;
};

type Dish = ResponseItem & DishRequest;


type UpdateDish = Partial<DishRequest>;

type changeVotedDishParms = {
    dishId: string; 
    voteId: string;
};


type UpdateDishParms = {
    dish_id: string;
    updateDish: UpdateDish; 
};

type DailyDishesProp = {
    title: string;
    dishes: Dish[];
    date: Date;
};

type DishFormProps = {
    isSubmitionError: boolean;
    defaultDish: Dish;
    onSubmit: (dish: DishRequest) => void;
    onClose: () => void;
    submitButtonText: string;
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
    changeVotedDishParms, 
    DishRequest,
    UpdateDish,
    UpdateDishParms,
    DailyDishesProp,
    DishFormProps
};