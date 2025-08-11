import { Redirect } from 'expo-router';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f8fafc',
                }}
            >
                <ActivityIndicator size="large" />
                <Text
                    style={{
                        fontFamily: 'Inter',
                        fontSize: 18,
                        marginTop: 16,
                        color: '#64748b'
                    }}
                >
                    Checking authentication...
                </Text>
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="./welcome" />;
    }

    return <>{children}</>;
}
