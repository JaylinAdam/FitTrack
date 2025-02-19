import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the home page inner texts</Text>
            <Link href="/calendar">View Calendar!</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
