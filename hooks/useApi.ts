import { useCallback, useState } from 'react';
import { authenticatedFetch } from '../lib/auth';

interface UseApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
}

interface ApiState<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export function useApi<T = any>() {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    const request = useCallback(async (
        url: string,
        options: UseApiOptions = {}
    ): Promise<T | null> => {
        setState({ data: null, error: null, loading: true });

        try {
            const { method = 'GET', headers = {}, body } = options;

            const requestOptions: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };

            if (body && method !== 'GET') {
                requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
            }

            const response = await authenticatedFetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setState({ data, error: null, loading: false });
            return data;

        } catch (error: any) {
            const errorMessage = error.message || 'An unexpected error occurred';
            setState({ data: null, error: errorMessage, loading: false });
            throw error;
        }
    }, []);

    const reset = useCallback(() => {
        setState({ data: null, error: null, loading: false });
    }, []);

    return {
        ...state,
        request,
        reset,
    };
}
