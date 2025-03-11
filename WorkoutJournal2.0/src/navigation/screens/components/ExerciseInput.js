import { Keyboard, StyleSheet, TextInput, View , Text, TouchableWithoutFeedback} from 'react-native'
import { Portal, Dialog } from 'react-native-paper'
import RoundIconBtn from './RoundIconBtn'

export function ExerciseInput({exercise, visible, change, submit, close}) {

    const handleKeyClose = () => {
        Keyboard.dismiss();
    }

    return(
        <>
            <Portal>
                <Dialog style={styles.dialogWrapper} visible={visible} animationType="fade">
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.columnLeft}>
                                <Text style={styles.title}>Exercise</Text>
                                <TextInput
                                    id="name"
                                    onChange={(event) => change(event)}
                                    value={exercise?.name}
                                />
                            </View>
                            <View style={styles.columnRight}>
                                <Text style={styles.title}>Info</Text>
                                <TextInput
                                    id="info"
                                    onChange={(event) => change(event)}
                                    value={exercise?.info}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.columnLeft}>
                                <Text style={styles.title}>Sets</Text>
                                <TextInput
                                    id="sets"
                                    onChange={(event) => change(event)}
                                    value={exercise?.sets}
                                />
                            </View>    
                            <View style={styles.columnRight}>
                                <Text style={styles.title}>Reps</Text>
                                <TextInput
                                    id="reps"
                                    onChange={(event) => change(event)}
                                    value={exercise?.reps}
                                />
                            </View>   
                        </View> 
                        <View style={styles.btnContainer}>
                            <RoundIconBtn 
                                size={25}
                                color={'white'}
                                bgColor={'green'}
                                antIconName='check' 
                                onPress={submit}
                            />
                            {(exercise.name.trim() || exercise.info.trim() || exercise.sets.trim() || exercise.reps.trim()) && (
                                <RoundIconBtn 
                                    size={25}
                                    style={{marginLeft: 15}}    
                                    antIconName='close' 
                                    color={'white'}
                                    bgColor={'red'}
                                    onPress={close}
                                />
                            )}
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={handleKeyClose}>
                        <View style={[styles.dialogBG, StyleSheet.absoluteFillObject]}/>
                    </TouchableWithoutFeedback>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    dialogWrapper: {
        marginTop: -350,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnLeft: {
        flex: 1,
        paddingRight: 10,
    },
    columnRight: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 20,
        fontInfo: 'bold',
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
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 25,
    },
    dialogBG: {
        zIndex: -1,
    },
})