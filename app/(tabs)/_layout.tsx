import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurface + '80', // 50% opacity
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outline,
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 2,
                },
                tabBarIconStyle: {
                    marginBottom: 2,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, color, size = 24 }) => (
                        <MaterialIcons
                            name={focused ? "home" : "home"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="wallet"
                options={{
                    title: "Wallet",
                    tabBarIcon: ({ focused, color, size = 24 }) => (
                        <MaterialIcons
                            name={focused ? "account-balance-wallet" : "account-balance-wallet"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused, color, size = 24 }) => (
                        <MaterialIcons
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}