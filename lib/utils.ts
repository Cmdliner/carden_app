import { authenticatedFetch } from './auth';
import { API_SERVER_URL } from './constants';

export async function refreshTokens(): Promise<boolean> {
    try {
        const fetchOpts: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
        }
        
        const res = await fetch(`${API_SERVER_URL}/api/v1/auth/refresh`, fetchOpts);
        
        if (!res.ok) {
            return false;
        }

        // Tokens are handled automatically by the auth system
        return true;
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        return false;
    }
}

// Utility function to make authenticated API calls
export async function makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_SERVER_URL}${endpoint}`;
    const response = await authenticatedFetch(url, options);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

// Example usage functions for your app
export async function fetchUserProfile(): Promise<any> {
    return makeAuthenticatedRequest('/api/v1/user/profile');
}

export async function updateUserProfile(profileData: any): Promise<any> {
    return makeAuthenticatedRequest('/api/v1/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function fetchWalletBalance(): Promise<any> {
    return makeAuthenticatedRequest('/api/v1/wallet/balance');
}

export async function fetchTransactionHistory(): Promise<any> {
    return makeAuthenticatedRequest('/api/v1/transactions');
}