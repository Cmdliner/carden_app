import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

export default function WalletScreen() {
    const theme = useTheme();
    
    return (
        <ScrollView 
            style={{ 
                flex: 1, 
                backgroundColor: theme.colors.background 
            }}
            contentContainerStyle={{
                padding: 16,
                gap: 16
            }}
        >
            <Card style={{ marginTop: 24 }}>
                <Card.Content style={{ alignItems: "center", padding: 24 }}>
                    <MaterialIcons 
                        name="account-balance-wallet" 
                        size={48} 
                        color={theme.colors.primary} 
                        style={{ marginBottom: 16 }}
                    />
                    <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
                        Your Wallet
                    </Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, marginTop: 8, textAlign: "center" }}>
                        Manage your digital assets and transactions
                    </Text>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "center", paddingBottom: 16 }}>
                    <Button mode="contained" onPress={() => {}}>
                        View Balance
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}