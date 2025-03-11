import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const GAP = 10; // Adjust gap size
const CARD_WIDTH = width / 2 - GAP; // Subtract gap and divide by 2

export function Home() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.navigate("Settings")}>
                View Settings
            </Button>
            <Button onPress={() => navigation.navigate("Calendar")}>
                Go to Calendar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: GAP / 2, // Ensures even padding around edges
    },
    head1: {
        fontSize: 30,
        fontWeight: 400,
    },
    cardContainer: {
        width: CARD_WIDTH, // Adjusted width accounting for the gap
        aspectRatio: 1, // Ensures square shape
        backgroundColor: "gray",
    },
})
