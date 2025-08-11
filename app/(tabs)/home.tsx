import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
    const { user } = useAuth();
    
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Welcome Header */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.greeting}>
                        {getGreeting()}, {user?.name?.split(' ')[0] || 'Welcome'}!
                    </Text>
                    <Text style={styles.subtitle}>
                        Ready to manage your digital assets?
                    </Text>
                </View>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>$0.00</Text>
                    <Text style={styles.balanceSubtext}>Loading your portfolio...</Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsSection}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionButtons}>
                        <Button 
                            mode="contained" 
                            style={[styles.actionButton, styles.primaryAction]}
                            contentStyle={styles.buttonContent}
                            buttonColor="#007AFF"
                            onPress={() => {}}
                        >
                            Send
                        </Button>
                        <Button 
                            mode="contained" 
                            style={[styles.actionButton, styles.secondaryAction]}
                            contentStyle={styles.buttonContent}
                            buttonColor="rgba(0, 122, 255, 0.1)"
                            textColor="#007AFF"
                            onPress={() => {}}
                        >
                            Receive
                        </Button>
                    </View>
                </View>

                {/* Account Overview */}
                <View style={styles.overviewSection}>
                    <Text style={styles.sectionTitle}>Account Overview</Text>
                    <View style={styles.overviewItems}>
                        <View style={styles.overviewItem}>
                            <View style={styles.overviewIcon}>
                                <Text style={styles.iconText}>🔒</Text>
                            </View>
                            <View style={styles.overviewContent}>
                                <Text style={styles.overviewTitle}>Security</Text>
                                <Text style={styles.overviewDescription}>All systems secure</Text>
                            </View>
                        </View>
                        
                        <View style={styles.overviewItem}>
                            <View style={styles.overviewIcon}>
                                <Text style={styles.iconText}>📊</Text>
                            </View>
                            <View style={styles.overviewContent}>
                                <Text style={styles.overviewTitle}>Activity</Text>
                                <Text style={styles.overviewDescription}>0 transactions this month</Text>
                            </View>
                        </View>
                        
                        <View style={styles.overviewItem}>
                            <View style={styles.overviewIcon}>
                                <Text style={styles.iconText}>⚡</Text>
                            </View>
                            <View style={styles.overviewContent}>
                                <Text style={styles.overviewTitle}>Performance</Text>
                                <Text style={styles.overviewDescription}>Optimal network status</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 24,
        paddingTop: 60,
        gap: 32,
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 8,
    },
    greeting: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    balanceCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 3,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 48,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    balanceSubtext: {
        fontSize: 14,
        color: '#94a3b8',
    },
    actionsSection: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    actionButton: {
        flex: 1,
        borderRadius: 16,
    },
    primaryAction: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    secondaryAction: {
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.2)',
    },
    buttonContent: {
        paddingVertical: 12,
    },
    overviewSection: {
        gap: 16,
    },
    overviewItems: {
        gap: 16,
    },
    overviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    overviewIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 24,
    },
    overviewContent: {
        flex: 1,
    },
    overviewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    overviewDescription: {
        fontSize: 14,
        color: '#64748b',
    },
});