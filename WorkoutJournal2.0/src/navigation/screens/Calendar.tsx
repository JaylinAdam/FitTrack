import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar as CalComp } from "react-native-calendars";
import { Session } from "../../../models/session";
import { TextInput } from "react-native-gesture-handler";

interface Day {
    dateString: string;
    day: number;
    month: number;
    timeStamp: Date;
    year: 2025;
}

const currentDate = () => {
    const now = new Date();
    return formatDate(now);
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
};

export function Calendar() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("");

    const [sessions, setSessions] = useState<Session[]>([]);

    const [exercise, setExercise] = useState<Exercise>({
        name: "",
        rep: "",
        sets: "",
        comments: "",
        weight: "",
    });
    console.log(exercise);

    const handleExChange = (event: any) => {
        const newValue = event.target.value;
        const targetId = event.target.id;
        setExercise({ ...exercise, [targetId]: newValue });
        console.log(exercise);
    };

    const handleExSubmit = (event: any) => {
        const sessionIndex = sessions?.findIndex((s) => s.date === selected);

        if (sessionIndex >= 0) {
            const sessionList = [...sessions];

            sessionList[sessionIndex].exercises = [
                ...sessionList[sessionIndex].exercises,
                exercise,
            ];
            setSessions(sessionList);
        } else {
            const newSession = new Session("adam", selected, "", [exercise]);
            setSessions([...sessions, newSession]);
        }
        console.log(sessions);
    };

    const currentSession = () => {
        const currentIndex = sessions?.findIndex((s) => s.date === selected);
        return sessions[currentIndex];
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                <CalComp
                    theme={{
                        backgroundColor: "#ffffff",
                        calendarBackground: "#ffffff",
                        textSectionTitleColor: "#00adf5",
                        selectedDayBackgroundColor: "#00adf5",
                        selectedDayTextColor: "#ffffff",
                        todayTextColor: "#00adf5",
                        dayTextColor: "#2d4150",
                        textDisabledColor: "#a3b8cc",
                    }}
                    current={currentDate()}
                    onDayPress={(day: Day) => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: {
                            selected: true,

                            disableTouchEvent: true,
                            selectedDotColor: "orange",
                        },
                    }}
                />
            </View>
            <TextInput
                id="name"
                placeholder="name"
                onChange={(event) => handleExChange(event)}
                value={exercise?.name}
            />
            <TextInput
                id="weight"
                placeholder="weight"
                onChange={(event) => handleExChange(event)}
                value={exercise?.weight}
            />
            <TextInput
                id="rep"
                placeholder="rep"
                onChange={(event) => handleExChange(event)}
                value={exercise?.rep}
            />
            <TextInput
                id="sets"
                placeholder="sets"
                onChange={(event) => handleExChange(event)}
                value={exercise?.sets}
            />

            <Button onPress={(event) => handleExSubmit(event)}>submit</Button>

            {currentSession()?.exercises.map((e) => {
                return (
                    <>
                        <Text>{e.name}</Text>
                        <Text>{e.rep}</Text>
                        <Text>{e.sets}</Text>
                        <Text>{e.weight}</Text>
                    </>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
    },
    calendarWrapper: {
        width: "100%",
        borderRadius: 15,
        overflow: "hidden",
        boxShadow: "0px 0px 3px #a3a3a3",
    },
});
