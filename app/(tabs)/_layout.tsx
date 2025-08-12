import { Tabs } from "expo-router";
import { House, User, Wallet } from "phosphor-react-native";
import { Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function TabLayout() {
    const theme = useTheme();

    return (
        <ProtectedRoute>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurface + '80',
                    tabBarStyle: {
                        backgroundColor: theme.colors.surface,
                        height: 60,
                        paddingBottom: 8,
                        paddingTop: 8,
                    },
                    tabBarShowLabel: false, // hide labels for a clean look
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size = 28 }) => (
                            <House color={color} size={size} weight="regular" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="wallet"
                    options={{
                        title: "Wallet",
                        tabBarIcon: ({ color, size = 28 }) => (
                            <Wallet color={color} size={size} weight="regular" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, size = 28 }) => (
                            <User color={color} size={size} weight="regular" />
                        ),
                    }}
                />
            </Tabs>
        </ProtectedRoute>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fffdfa',
        paddingTop: Platform.OS === 'ios' ? 60 : 32,
        paddingBottom: 18,
        paddingHorizontal: 24,
        borderBottomWidth: 0,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    headerText: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
        letterSpacing: 0.5,
    },
});