import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister,
    clearTokens,
    getAccessToken,
    getRefreshToken,
    getStoredUser,
    storeTokens,
    storeUser
} from '../lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = user !== null;

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);

            const accessToken = await getAccessToken();
            const refreshToken = await getRefreshToken();

            if (!accessToken || !refreshToken) {
                setUser(null);
                return;
            }

            // Get stored user data
            const storedUser = await getStoredUser();
            if (storedUser) {
                setUser(storedUser);
            } else {
                await clearTokens();
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);

            await clearTokens();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);

            const authResponse = await apiLogin(credentials);

            await storeTokens({
                accessToken: authResponse.access_token,
                refreshToken: authResponse.refresh_token,
            });
            await storeUser(authResponse.user);

            setUser(authResponse.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            setIsLoading(true);

            const authResponse = await apiRegister(credentials);


            await storeTokens({
                accessToken: authResponse.access_token,
                refreshToken: authResponse.refresh_token,
            });
            await storeUser(authResponse.user);

            setUser(authResponse.user);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            await apiLogout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
