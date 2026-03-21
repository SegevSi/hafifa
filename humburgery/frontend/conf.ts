const Routes: Record<string, string> = {
    HOME: "/main/home",
    STATISTICS: "/main/statistics",
    LOGIN: "/"
} as const;

const DaysData = {
    TODAY: "היום",
    DAYS: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]  
} as const; 


const QueryKeys = {
    GET_ALL_DISHES: ['dishes'],
    GET_DISHES_STATS: ['dishesStats'],
    GET_USER_VOTE: ['currentVote']
} as const;

const ACCESS_TOKEN_KEY = "accessToken";

export { Routes, ACCESS_TOKEN_KEY, DaysData, QueryKeys };