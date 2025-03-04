import { View, Text, StyleSheet, Keyboard, FlatList, TouchableWithoutFeedback } from "react-native"
import { useState } from "react"
import RoundIconBtn from "./components/RoundIconBtn"
import ExerciseInputModal from "./components/ExerciseInputModal"
import {Exercise as ExerciseComponent} from "./components/Exercise";
import {Exercise} from "../../../models/excercise"

interface Session {
  id: number
  date: string
  exercises: Exercise[]
}

export function Workouts() {
  const [modalVisible, setModalVisible] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [sessions, setSessions] = useState<Session[]>([])

  const handleOnSubmit = (name: string, sets: number, reps: number) => {
    const date = new Date().toISOString().split('T')[0];
    const exercise: Exercise = new Exercise(name, 0, reps, sets, "")
    const session: Session = {id: Date.now(), date, exercises}



    setSessions((prevSessions) => {
      const existingSession = prevSessions.find(session => session.date === date)

      if (existingSession) {
        return prevSessions.map(session =>
          session.date === date
          ? {...session, exercises: [...session.exercises, exercise]}
          : session
        )
      } else return [...prevSessions, session]
    })
    
    setExercises((updatedExercises) => [...updatedExercises, exercise])

    console.log(sessions)
  }

  return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <FlatList
              data={exercises}
              keyExtractor={item => item.name.toString()}
              renderItem={({item}) => <ExerciseComponent item={item} />}/>
            {!exercises.length ? (
              <View 
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeaderContainer]}> 
                <Text style={styles.emptyHeader}>Add Workout</Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn 
          antIconName='plus' 
          size={40} 
          color="white"
          bgColor={'#f4511e'}
          style={styles.addBtn} 
          onPress={() => setModalVisible(true)}/>
        <ExerciseInputModal
          visible={modalVisible} 
          onClose={() => setModalVisible(false) } 
          onSubmit={handleOnSubmit}/>
      </>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        zIndex: 1,
    },
    emptyHeader: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.25,
    },
    emptyHeaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      paddingBottom: 80,
      zIndex: -1,
    },
    addBtn: {
        position: "absolute",
        right: 30,
        bottom: 30,
        opacity: 0.9,
        zIndex: 1,
    },
})
