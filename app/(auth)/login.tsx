import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
    return (
        <KeyboardAvoidingView>
            <Text> Register</Text>

            <TextInput placeholder="Email: "/>

            <TextInput placeholder="Password: " />

            <Button> Login </Button>
        </KeyboardAvoidingView>
    );
}