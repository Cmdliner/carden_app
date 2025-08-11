declare global {
export interface User {
    id: string;
    email: string;
    name?: string;
    // Add other user properties as needed
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  
  // Utility
  checkAuthStatus: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

}

export default {};