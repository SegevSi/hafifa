const Routes: Record<string, string> = {
    HOME: "/main/home",
    STATISTICS: "/main/statistics",
    LOGIN: "/"
} as const;

const ACCESS_TOKEN_KEY = "accessToken";

export { Routes, ACCESS_TOKEN_KEY };