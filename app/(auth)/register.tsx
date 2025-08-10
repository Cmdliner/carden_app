import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegisterScreen() {
    return (
        <KeyboardAvoidingView>
            <Text> Register</Text>

            <TextInput placeholder="Email: "/>

            <TextInput placeholder="Password: " />
   
            <TextInput placeholder="Confirm Password: " />

            <Button> Login </Button>
        </KeyboardAvoidingView>
    );
}