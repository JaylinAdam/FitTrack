import { Button, Text } from "@react-navigation/elements"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"

export function Home() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>

            <Button onPress={() => navigation.navigate("Workouts")}>
                View Workouts
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
})
