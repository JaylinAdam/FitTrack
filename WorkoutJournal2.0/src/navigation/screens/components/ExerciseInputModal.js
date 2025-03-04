import { Keyboard, Modal, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, View , Text} from 'react-native'
import React, {useState} from 'react'
import RoundIconBtn from './RoundIconBtn'

const ExerciseInputModal = ({visible, onClose, onSubmit}) => {
    const [name, setName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')


    const handleModalClose = () => {
        Keyboard.dismiss()
    }
    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'name') setName(text)
        if(valueFor === 'sets') setSets(text)
        if(valueFor === 'reps') setReps(text)
    }
    const handleSubmit = () => {
        if(!name.trim() && !sets.trim() && !reps.trim()) return onClose()
        onSubmit(name, sets, reps)
        setName('')
        setSets('')
        setReps('')
        onClose()
    }

    const closeModal = () => {
        setName('')
        setSets('')
        setReps('')
        onClose()
    }

    return(
        <>
        <StatusBar hidden />
            <Modal visible={visible} animationType="fade">
                <View style={styles.container}>
                    <Text style={styles.title}>Exercise Name</Text>
                    <TextInput
                    value={name}
                    onChangeText={(text) => handleOnChangeText(text, 'name')}
                    style={[styles.input, styles.name]}/>

                    <View style={styles.columnContainer}>
                        <View style={styles.column} paddingRight={15}>
                            <Text style={styles.title}>Sets</Text>
                            <TextInput 
                            value={sets}
                            keyboardType='numeric'
                            onChangeText={(text) => handleOnChangeText(text, 'sets')}
                            style={[styles.input, styles.sets]}/>
                        </View>    

                        <View style={styles.column} paddingLeft={15}>
                            <Text style={styles.title}>Reps</Text>
                            <TextInput 
                            value={reps}
                            keyboardType='numeric'
                            onChangeText={(text) => handleOnChangeText(text, 'reps')}
                            style={[styles.input, styles.reps]}/>
                        </View>   
                    </View>

                    <View style={styles.btnContainer}>
                        <RoundIconBtn 
                        size={25}
                        color={'white'}
                        bgColor={'green'}
                        antIconName='check' 
                        onPress={handleSubmit}/>
                        { name.trim() || sets.trim() || reps.trim() ? (
                            <RoundIconBtn 
                            size={25}
                            style={{marginLeft: 15}}    
                            antIconName='close' 
                            color={'white'}
                            bgColor={'red'}
                            onPress={closeModal}/>
                        ) : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        fontSize: 20,
        color: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderBottomColor: 'black',
    },
    name: {
        height: 50,
        marginBottom: 15,
    },
    sets: {
        height: 50,
    },
    reps: {
        height: 50,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 25,
    },
})

export default ExerciseInputModal