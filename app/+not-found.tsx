import { View } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            {/* <Stack.Screen options={{title: "Oops!"}} /> */}
            <Text style={styles.text}>Oops! Page doesn't exist</Text>
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