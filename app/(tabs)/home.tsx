import { ScrollView } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
    const theme = useTheme();
    
    return (
        <ScrollView 
            style={{ 
                flex: 1, 
                backgroundColor: theme.colors.background 
            }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16
            }}
        >
            <Surface 
                style={{
                    padding: 24,
                    borderRadius: 12,
                    elevation: 2,
                    alignItems: "center"
                }}
            >
                <Text 
                    variant="headlineMedium" 
                    style={{
                        color: theme.colors.primary,
                        fontFamily: "SpaceGrotesk",
                        textAlign: "center"
                    }}
                > 
                    Welcome Home 
                </Text>
                <Text 
                    variant="bodyMedium" 
                    style={{
                        color: theme.colors.onSurface,
                        marginTop: 8,
                        textAlign: "center"
                    }}
                >
                    Your personal dashboard
                </Text>
            </Surface>
        </ScrollView>
    );
}