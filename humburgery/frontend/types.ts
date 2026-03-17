
type LoginFormInput = {
    username: string;
    password: string;
}

interface AuthFetchOptions {
    headers: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type { LoginFormInput, AuthFetchOptions, HttpMethod };