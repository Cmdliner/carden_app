import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function WalletScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Wallet Header */}
                <View style={styles.walletHeader}>
                    <View style={styles.walletIconContainer}>
                        <Text style={styles.walletIcon}>💳</Text>
                    </View>
                    <Text style={styles.walletTitle}>Your Wallet</Text>
                    <Text style={styles.walletDescription}>
                        Manage your digital assets and transactions
                    </Text>
                </View>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>$0.00</Text>
                    <View style={styles.balanceChange}>
                        <Text style={styles.changeText}>+$0.00 (0%) today</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsSection}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionButtons}>
                        <View style={styles.actionButton}>
                            <View style={styles.actionIcon}>
                                <Text style={styles.actionIconText}>↗️</Text>
                            </View>
                            <Text style={styles.actionText}>Send</Text>
                        </View>
                        <View style={styles.actionButton}>
                            <View style={styles.actionIcon}>
                                <Text style={styles.actionIconText}>↙️</Text>
                            </View>
                            <Text style={styles.actionText}>Receive</Text>
                        </View>
                        <View style={styles.actionButton}>
                            <View style={styles.actionIcon}>
                                <Text style={styles.actionIconText}>💱</Text>
                            </View>
                            <Text style={styles.actionText}>Swap</Text>
                        </View>
                        <View style={styles.actionButton}>
                            <View style={styles.actionIcon}>
                                <Text style={styles.actionIconText}>📈</Text>
                            </View>
                            <Text style={styles.actionText}>Buy</Text>
                        </View>
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={styles.transactionsSection}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <View style={styles.transactionItem}>
                        <View style={styles.transactionIcon}>
                            <Text style={styles.transactionIconText}>🎯</Text>
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionTitle}>Welcome Bonus</Text>
                            <Text style={styles.transactionDate}>Just now</Text>
                        </View>
                        <Text style={styles.transactionAmount}>+$0.00</Text>
                    </View>
                </View>

                {/* View Balance Button */}
                <View style={styles.buttonSection}>
                    <Button 
                        mode="contained"
                        onPress={() => {}}
                        style={styles.primaryButton}
                        contentStyle={styles.buttonContent}
                        buttonColor="#4a90e2"
                    >
                        View Full Balance
                    </Button>
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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 100,
    },
    walletHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    walletIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e0e7ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    walletIcon: {
        fontSize: 28,
    },
    walletTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    walletDescription: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
    },
    balanceCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        alignItems: 'center',
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 2,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    balanceChange: {
        backgroundColor: '#e0e7ef',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    changeText: {
        fontSize: 14,
        color: '#16a34a',
        fontWeight: '500',
    },
    actionsSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e7ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionIconText: {
        fontSize: 16,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a2e',
        textAlign: 'center',
    },
    transactionsSection: {
        marginBottom: 32,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e7ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    transactionIconText: {
        fontSize: 16,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 2,
    },
    transactionDate: {
        fontSize: 14,
        color: '#64748b',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#16a34a',
    },
    buttonSection: {
        marginTop: 16,
    },
    primaryButton: {
        borderRadius: 16,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonContent: {
        height: 56,
    },
});