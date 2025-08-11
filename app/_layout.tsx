import { Inter_400Regular } from "@expo-google-fonts/inter";
import { SpaceGrotesk_500Medium, useFonts } from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider, Text } from "react-native-paper";
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
    
    return !loaded ? <Text>Loading...</Text> : (
        <PaperProvider>
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
