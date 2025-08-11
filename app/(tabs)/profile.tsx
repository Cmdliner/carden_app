import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    
    const handleLogout = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: logout,
                },
            ]
        );
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>
                        {user?.name || 'Your Profile'}
                    </Text>
                    <Text style={styles.userEmail}>
                        {user?.email}
                    </Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Text style={styles.menuIconText}>⚙️</Text>
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Account Settings</Text>
                            <Text style={styles.menuDescription}>Manage your account details</Text>
                        </View>
                        <Text style={styles.menuArrow}>›</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Text style={styles.menuIconText}>🔔</Text>
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Notifications</Text>
                            <Text style={styles.menuDescription}>Configure your notifications</Text>
                        </View>
                        <Text style={styles.menuArrow}>›</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Text style={styles.menuIconText}>🔒</Text>
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Privacy & Security</Text>
                            <Text style={styles.menuDescription}>Manage your privacy settings</Text>
                        </View>
                        <Text style={styles.menuArrow}>›</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Text style={styles.menuIconText}>❓</Text>
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Help & Support</Text>
                            <Text style={styles.menuDescription}>Get help and contact support</Text>
                        </View>
                        <Text style={styles.menuArrow}>›</Text>
                    </View>
                </View>

                {/* Logout Section */}
                <View style={styles.logoutSection}>
                    <Button 
                        mode="contained"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        contentStyle={styles.buttonContent}
                        buttonColor="#ff4757"
                    >
                        Sign Out
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0c0c',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 100,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#ffffff',
    },
    userName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#888888',
    },
    menuSection: {
        marginBottom: 32,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuIconText: {
        fontSize: 18,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 2,
    },
    menuDescription: {
        fontSize: 14,
        color: '#888888',
    },
    menuArrow: {
        fontSize: 20,
        color: '#666666',
        fontWeight: '300',
    },
    logoutSection: {
        marginTop: 16,
    },
    logoutButton: {
        borderRadius: 16,
        shadowColor: '#ff4757',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonContent: {
        height: 56,
    },
});