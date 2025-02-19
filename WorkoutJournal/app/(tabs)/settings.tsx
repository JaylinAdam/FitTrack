import { View, Text, StyleSheet } from "react-native";

export default function SettingsScren() {
    return (
        <View style={styles.container}>
            <Text>Inner portion of settings tab screen</Text>
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
