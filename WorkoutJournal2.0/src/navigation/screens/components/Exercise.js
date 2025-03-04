import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Exercise = ({item}) => {
    const {name, sets, reps} = item
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc}>{sets}x{reps}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        padding: 8,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 60,
    },
    title: {
        fontSize: 20,
    },
    desc: {
        fontSize: 15,
    }
})
