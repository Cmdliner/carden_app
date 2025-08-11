import * as SecureStore from 'expo-secure-store';
import { API_SERVER_URL, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from './constants';
import { Platform } from 'react-native';


export async function storeTokens(tokens: AuthTokens): Promise<void> {
    try {
        if (Platform.OS == "web") {
            localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        } else {

            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
        }
    } catch (error) {
        console.error('Error storing tokens:', error);
        throw error;
    }
}

export async function getAccessToken(): Promise<string | null> {
    try {
        let accessToken = null;
        if (Platform.OS === "web") accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        else accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

export async function getRefreshToken(): Promise<string | null> {
    try {
        let refreshToken = null;
        if (Platform.OS === "web") refreshToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        else refreshToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
        return refreshToken;
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
}

export async function clearTokens(): Promise<void> {
    try {
        if (Platform.OS === "web") {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        } else {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);
        }
    } catch (error) {
        console.error('Error clearing tokens:', error);
        throw error;
    }
}

export async function storeUser(user: User): Promise<void> {
    try {
        if(Platform.OS === "web") localStorage.setItem(USER_KEY, JSON.stringify(user));
        else await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
        throw error;
    }
}

export async function getStoredUser(): Promise<User | null> {
    try {
        let userData = null;
        if(Platform.OS === "web") userData = localStorage.getItem(USER_KEY);
        else userData = await SecureStore.getItemAsync(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting stored user:', error);
        return null;
    }
}

// API fns
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_SERVER_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = { message: 'Login failed' };
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        const accessToken = data.data.access_token || '';
        const refreshToken = data.data.refresh_token || '';

        if (!accessToken || !refreshToken) {
            throw new Error('Tokens not received from server');
        }


        return {
            user: data.user,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_SERVER_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();

        const accessToken = data.data.access_token || '';
        const refreshToken = data.data.refresh_token || '';

        if (!accessToken || !refreshToken) {
            throw new Error('Tokens not received from server');
        }

        return {
            user: data.user,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_SERVER_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Refresh': refreshToken,
            },
            mode: 'cors',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const newAccessToken = response.headers.get('Authorization')?.replace('Bearer ', '');
        const newRefreshToken = response.headers.get('X-Refresh');

        if (newAccessToken) {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
        }

        if (newRefreshToken) {
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
        }

        return newAccessToken || null;
    } catch (error) {
        console.error('Token refresh error:', error);
        // Clear tokens if refresh fails
        await clearTokens();
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        const refreshToken = await getRefreshToken();

        if (refreshToken) {
            await fetch(`${API_SERVER_URL}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Refresh': refreshToken,
                },
                mode: 'cors',
                credentials: 'include',
            }).catch(() => {
                console.warn('Server logout failed, clearing local tokens anyway');
            });
        }
    } finally {
        await clearTokens();
    }
}

export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    let accessToken = await getAccessToken();

    if (!accessToken) {
        throw new Error('No access token available');
    }

    // First attempt with current token
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    // If unauthorized, try to refresh token
    if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            // Retry with new token
            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
        } else {
            throw new Error('Authentication failed');
        }
    }

    return response;
}
