import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) router.replace("/(tabs)/home");
            else router.replace("./welcome");

        }
    }, [isAuthenticated, isLoading, router]);


    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#f8fafc',
            }}
        >
            <ActivityIndicator size="large" />
            <Text
                style={{
                    fontFamily: "Inter",
                    fontSize: 18,
                    marginTop: 16,
                    color: '#64748b'
                }}
            >
                Loading...
            </Text>
        </View>
    );
}
