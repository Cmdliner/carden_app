import { Inter_400Regular } from "@expo-google-fonts/inter";
import { SpaceGrotesk_500Medium, useFonts } from "@expo-google-fonts/space-grotesk";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider, Text } from "react-native-paper";

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
    return !loaded ? <Text > Loading... </Text> : (
        <PaperProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
                
            </Stack>
        </PaperProvider>
    );
}
