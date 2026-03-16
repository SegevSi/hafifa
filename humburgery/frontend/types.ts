
type LoginFormInput = {
    username: string;
    password: string;
}

interface AuthFetchOptions {
    headers: Record<string, string>;
}

export type { LoginFormInput, AuthFetchOptions };