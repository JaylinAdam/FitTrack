import { Keyboard, Modal, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, {useState} from 'react'

const NoteInputModal = ({visible}) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const handleModalClose = () => {
        Keyboard.dismiss
    }

    return(
        <>
        <StatusBar hidden />
        <Modal visible={visible} animationType="fade">
            <View style={styles.container}>
                <TextInput 
                placeholder='Insert Title' 
                placeholderTextColor={'grey'}
                style={[styles.input, styles.title]} />
                <TextInput multiline 
                placeholder='Insert Text' 
                placeholderTextColor={'grey'}
                style={[styles.input, styles.desc]} />
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
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
    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        fontSize: 20,
        color: 'black',
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    desc: {
        height: 200,
    },
    modalBG: {
        flex: 1,
        zINdex: -1,
    }
})

export default NoteInputModal