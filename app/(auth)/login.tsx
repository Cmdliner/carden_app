import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';


        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            await login({ email: email.trim(), password });
            router.replace("/(tabs)/home");
        } catch (error: any) {
            Alert.alert(
                'Login Failed',
                error.message || 'An error occurred during login. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View style={styles.backButton}>
                            <Button
                                mode="text"
                                onPress={() => router.back()}
                                textColor="rgba(255, 255, 255, 0.7)"
                                compact
                            >
                                ← Back
                            </Button>
                        </View>

                        <Text style={styles.title}>
                            Sign In
                        </Text>
                        <Text style={styles.subtitle}>
                            Welcome back! Please sign in to continue
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                            }}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            error={!!errors.email}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#007AFF',
                                    outline: 'rgba(255, 255, 255, 0.2)',
                                    onSurfaceVariant: 'rgba(255, 255, 255, 0.6)',
                                    onSurface: 'white',
                                    surface: 'rgba(255, 255, 255, 0.05)',
                                }
                            }}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>
                                {errors.email}
                            </Text>
                        )}

                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                            }}
                            mode="outlined"
                            secureTextEntry={!showPassword}
                            autoComplete="password"
                            error={!!errors.password}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#007AFF',
                                    outline: 'rgba(255, 255, 255, 0.2)',
                                    onSurfaceVariant: 'rgba(255, 255, 255, 0.6)',
                                    onSurface: 'white',
                                    surface: 'rgba(255, 255, 255, 0.05)',
                                }
                            }}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>
                                {errors.password}
                            </Text>
                        )}

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            disabled={isLoading}
                            style={styles.loginButton}
                            contentStyle={styles.buttonContent}
                            buttonColor="#007AFF"
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <Button
                            mode="text"
                            onPress={() => router.push('/(auth)/register')}
                            style={styles.registerButton}
                            contentStyle={styles.buttonContent}
                            textColor="rgba(255, 255, 255, 0.8)"
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 17,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        marginBottom: 24,
    },
    formContainer: {
        gap: 20,
    },
    input: {
        backgroundColor: 'transparent',
    },
    errorText: {
        color: '#ff4757',
        fontSize: 14,
        marginTop: -16,
        marginBottom: 8,
        marginLeft: 4,
    },
    loginButton: {
        marginTop: 8,
        borderRadius: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonContent: {
        paddingVertical: 16,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 16,
        fontSize: 14,
    },
    registerButton: {
        borderRadius: 16,
    },
});