import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Oops! Screen doesn't exist</Text>
            <Link href="/" style={styles.text}>
                Go to home screen
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        textAlign: "center",
        backgroundColor: "#000",
        color: "#fff"
    },
    text: {
        color: "inherit",
        fontSize: 24,
    }
});