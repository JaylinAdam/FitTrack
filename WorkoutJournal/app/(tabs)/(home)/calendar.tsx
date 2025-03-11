import { View, Text, StyleSheet } from "react-native";
import RoundIconBtn from "../../components/RoundIconBtn";
import Exercise

export default function CalendarScreen() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.header}>Add Workout</Text>
                <RoundIconBtn 
                    antIconName='plus' 
                    size={40} 
                    color="white" 
                    style={styles.addBtn} 
                    onPress={() => console.log('Button Pressed')} 
                />
            </View>
            <NoteInputModal visible={true} />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        opacity: 0.25,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addBtn: {
        position: "absolute",
        right: 30,
        bottom: 30,
    },
});
