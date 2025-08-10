import { ScrollView } from "react-native";
import { Avatar, Card, Divider, List, Text, useTheme } from "react-native-paper";

export default function ProfileScreen() {
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
                    <Avatar.Icon 
                        size={80} 
                        icon="person" 
                        style={{ backgroundColor: theme.colors.primaryContainer }}
                    />
                    <Text variant="headlineMedium" style={{ color: theme.colors.primary, marginTop: 16 }}>
                        Your Profile
                    </Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, marginTop: 8, textAlign: "center" }}>
                        Manage your account settings and preferences
                    </Text>
                </Card.Content>
            </Card>
            
            <Card>
                <List.Item
                    title="Account Settings"
                    description="Manage your account details"
                    left={props => <List.Icon {...props} icon="settings" />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                />
                <Divider />
                <List.Item
                    title="Notifications"
                    description="Configure your notifications"
                    left={props => <List.Icon {...props} icon="notifications" />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                />
                <Divider />
                <List.Item
                    title="Privacy & Security"
                    description="Manage your privacy settings"
                    left={props => <List.Icon {...props} icon="security" />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                />
            </Card>
        </ScrollView>
    );
}