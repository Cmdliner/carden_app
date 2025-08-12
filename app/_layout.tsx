import { Inter_400Regular } from "@expo-google-fonts/inter";
import { SpaceGrotesk_500Medium, useFonts } from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MD3LightTheme, PaperProvider, Text } from "react-native-paper";
import { AuthProvider } from "../contexts/AuthContext";

SplashScreen.setOptions({
    duration: 1000,
    fade: true
})
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceGrotesk: SpaceGrotesk_500Medium,
        Inter: Inter_400Regular
    })

    useEffect(() => {
        if (loaded) SplashScreen.hide();
    }, [loaded]);

    // Custom light, warm theme
    const theme = {
        ...MD3LightTheme,
        colors: {
            ...MD3LightTheme.colors,
            background: '#f9f7f3', // warm light
            surface: '#fffdfa', // slightly off-white
            primary: '#7c5c2b', // warm brown/gold
            onPrimary: '#fff',
            secondary: '#e6cfa7',
            onSecondary: '#3a2c13',
            text: '#1a1a2e',
            onSurface: '#1a1a2e',
            outline: '#e0d7c3',
        },
    };

    return !loaded ? <Text>Loading...</Text> : (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="welcome" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </AuthProvider>
        </PaperProvider>
    );
}
