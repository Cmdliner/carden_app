import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterScreen() {
    const router = useRouter();
    const { register, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string
    }>({});

    const validateForm = () => {
        const newErrors: {
            name?: string;
            email?: string;
            password?: string;
            confirmPassword?: string
        } = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await register({
                email: email.trim(),
                password,
                name: name.trim()
            });
            // Navigation will be handled automatically by auth state change
        } catch (error: any) {
            Alert.alert(
                'Registration Failed',
                error.message || 'An error occurred during registration. Please try again.',
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
                            Create Account
                        </Text>
                        <Text style={styles.subtitle}>
                            Join thousands of users managing their digital assets securely
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            label="Full Name"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                            }}
                            mode="outlined"
                            autoCapitalize="words"
                            autoComplete="name"
                            error={!!errors.name}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#007AFF',
                                    outline: '#cbd5e1',
                                    onSurfaceVariant: '#64748b',
                                    onSurface: '#1a1a2e',
                                    surface: '#fff',
                                    placeholder: '#64748b',
                                    text: '#1a1a2e',
                                }
                            }}
                        />
                        {errors.name && (
                            <Text style={styles.errorText}>
                                {errors.name}
                            </Text>
                        )}

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
                                    outline: '#cbd5e1',
                                    onSurfaceVariant: '#64748b',
                                    onSurface: '#1a1a2e',
                                    surface: '#fff',
                                    placeholder: '#64748b',
                                    text: '#1a1a2e',
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
                            autoComplete="password-new"
                            error={!!errors.password}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#007AFF',
                                    outline: '#cbd5e1',
                                    onSurfaceVariant: '#64748b',
                                    onSurface: '#1a1a2e',
                                    surface: '#fff',
                                    placeholder: '#64748b',
                                    text: '#1a1a2e',
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

                        <TextInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                            }}
                            mode="outlined"
                            secureTextEntry={!showConfirmPassword}
                            error={!!errors.confirmPassword}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: '#007AFF',
                                    outline: '#cbd5e1',
                                    onSurfaceVariant: '#64748b',
                                    onSurface: '#1a1a2e',
                                    surface: '#fff',
                                    placeholder: '#64748b',
                                    text: '#1a1a2e',
                                }
                            }}
                            right={
                                <TextInput.Icon
                                    icon={showConfirmPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            }
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>
                                {errors.confirmPassword}
                            </Text>
                        )}

                        <Button
                            mode="contained"
                            onPress={handleRegister}
                            disabled={isLoading}
                            style={styles.registerButton}
                            contentStyle={styles.buttonContent}
                            buttonColor="#007AFF"
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <Button
                            mode="text"
                            onPress={() => router.push('/(auth)/login')}
                            style={styles.loginButton}
                            contentStyle={styles.buttonContent}
                            textColor="#1a1a2e"
                        >
                            Already have an account? Sign In
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
        backgroundColor: '#f8fafc', // light warm background
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
        color: '#1a1a2e',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 17,
        color: '#64748b',
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
    registerButton: {
        marginTop: 8,
        borderRadius: 16,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 2,
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
        backgroundColor: '#e0e7ef',
    },
    dividerText: {
        color: '#94a3b8',
        marginHorizontal: 16,
        fontSize: 14,
    },
    loginButton: {
        borderRadius: 16,
    },
});