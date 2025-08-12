import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            <View style={styles.heroSection}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>C</Text>
                    </View>
                </View>

                <Text style={styles.title}>
                    Welcome to Carden
                </Text>

                <Text style={styles.subtitle}>
                    Your secure digital wallet for the modern world.
                    Manage your assets with confidence and ease.
                </Text>
            </View>

            {/* Action Section */}
            <View style={styles.actionSection}>
                <Button
                    mode="contained"
                    onPress={() => router.push('/(auth)/register')}
                    style={styles.primaryButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    buttonColor="#007AFF"
                >
                    Get Started
                </Button>

                <Button
                    mode="text"
                    onPress={() => router.push('/(auth)/login')}
                    style={styles.secondaryButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.secondaryButtonLabel}
                >
                    Already have an account? Sign In
                </Button>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Trusted by thousands worldwide
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc', // light warm background
    },
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: height * 0.1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoBadge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    logoText: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk',
        color: '#1a1a2e',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk',
        color: '#1a1a2e',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 17,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    actionSection: {
        paddingHorizontal: 32,
        paddingBottom: 64,
        gap: 16,
    },
    primaryButton: {
        borderRadius: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    secondaryButton: {
        borderRadius: 16,
    },
    buttonContent: {
        paddingVertical: 16,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
    },
    secondaryButtonLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#64748b',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 32,
    },
    footerText: {
        color: '#94a3b8',
        fontSize: 14,
    },
});
