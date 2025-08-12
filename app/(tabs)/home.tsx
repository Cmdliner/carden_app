import { useState } from 'react';
import { Pressable, StyleSheet, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Text } from "react-native-paper";
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([
        { key: '1', title: 'Groceries', updated: '2025-08-10 14:30' },
        { key: '2', title: 'Rent', updated: '2025-08-01 09:00' },
        { key: '3', title: 'Utilities', updated: '2025-08-05 16:45' },
        { key: '4', title: 'Gym Membership', updated: '2025-08-11 18:20' },
        { key: '5', title: 'Dining Out', updated: '2025-08-09 20:10' },
    ]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const renderExpenseItem = ({ item, drag, isActive }: RenderItemParams<any>) => (
        <View style={[styles.expenseItem, isActive && styles.expenseItemActive]}>
            <View style={styles.expenseTextContainer}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseUpdated}>Last updated: {item.updated}</Text>
            </View>
            <Pressable
                onLongPress={drag}
                style={({ pressed }) => [
                    styles.expenseDragHandle,
                    pressed && { backgroundColor: '#e0e7ef' }
                ]}
            >
                <Text style={{ color: '#64748b', fontFamily: 'Inter', fontWeight: '600', fontSize: 20 }}>☰</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.screenWrap}>
            <DraggableFlatList
                data={expenses}
                onDragEnd={({ data }) => setExpenses(data)}
                keyExtractor={item => item.key}
                renderItem={renderExpenseItem}
                contentContainerStyle={styles.listContent}
                activationDistance={10}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.headerWrap}>
                        <Text style={styles.greeting}>
                            {getGreeting()}, <Text style={styles.greetingName}>{user?.name?.split(' ')[0] || 'Welcome'}</Text>!
                        </Text>
                        <Text style={styles.subtitle}>
                            Ready to manage your digital assets?
                        </Text>
                        <Text style={styles.sectionTitle}>Priority Expenses</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrap: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
        paddingTop: 36,
        paddingBottom: 0,
    },
    listContent: {
        paddingBottom: 32,
    },
    headerWrap: {
        alignItems: 'center',
        marginBottom: 18,
    },
    content: {
        padding: 24,
        paddingTop: 60,
        gap: 32,
    },
    greeting: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 4,
    },
    greetingName: {
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#007AFF',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 18,
    },
    expensesList: {
        marginTop: 12,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 16,
        marginBottom: 12,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    expenseItemActive: {
        backgroundColor: '#f1f5f9',
        shadowOpacity: 0.18,
    },
    expenseTextContainer: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    expenseUpdated: {
        fontSize: 13,
        color: '#64748b',
        fontFamily: 'Inter',
    },
    expenseDragHandle: {
        borderRadius: 8,
        borderColor: '#e0e7ef',
        borderWidth: 1,
        marginLeft: 8,
        backgroundColor: '#f8fafc',
        minWidth: 32,
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
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