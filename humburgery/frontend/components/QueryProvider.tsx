"use client"

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';
import { onFetchWithAuthError } from "../utils/api";


export default function QueryProvider({ children }: {children: React.ReactNode;}) {
    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: onFetchWithAuthError,
        }),
    }));

    return (
        <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
    );
}