import { Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View} from "react-native";
import { Calendar as CalComp } from "react-native-calendars";
import { Session } from "../../../models/session";
import { Exercise } from "../../../models/excercise";
import { ExerciseInput } from "./components/ExerciseInput";
import RoundIconBtn from "./components/RoundIconBtn";


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

    const [visible, setVisible] = useState(false)

    const [selected, setSelected] = useState("");

    const [sessions, setSessions] = useState<Session[]>([]);

    const [exercise, setExercise] = useState<Exercise>({
        name: "",
        reps: "",
        sets: "",
        info: "",
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
            const newSession = new Session("", selected, "", [exercise]);
            setSessions([...sessions, newSession]);
        }

        handleExClose(null)
        console.log(sessions);
    };

    const handleExClose = (event: any) => {
        setExercise ({
            name: "",
            info: "",
            sets: "",
            reps: "",
        })
        setVisible(false)
    }

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
            
            <View style={[styles.exerciseWrapper, StyleSheet.absoluteFillObject]}>
                <ExerciseInput
                    exercise={exercise} 
                    visible={visible} 
                    change={handleExChange} 
                    submit={handleExSubmit} 
                    close={handleExClose}
                />

                {currentSession()?.exercises.map((e) => {
                    return (
                        <View style={styles.note}>
                            <Text style={styles.title}>{e.name}</Text>
                            <Text style={styles.desc}>{e.sets}x{e.reps}•{e.info}</Text>
                        </View>
                    );
                })}

                <RoundIconBtn 
                    antIconName='plus' 
                    size={40} 
                    color="white" 
                    bgColor={'#f4511e'} 
                    style={styles.addBtn} 
                    onPress={() => setVisible(true)}
                />
            </View>
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
    exerciseWrapper: {
        justifyContent: "flex-start",
        alignItems: "baseline",
        paddingTop: 370,
        paddingLeft: 80,
    },
    addBtn: {
        left: -70,
        opacity: 0.9,
        zIndex: 1,
    },
    note: {
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        boxShadow: "0px 0px 3px #a3a3a3",
    },
    title: {
        fontSize: 20,
    },
    desc: {
        fontSize: 16,
    }
});
