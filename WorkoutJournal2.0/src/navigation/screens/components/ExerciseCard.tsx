import React, { useMemo, useState } from 'react';
import { Text, StyleSheet, Pressable, Button, View } from 'react-native';
import { Theme, Tools, useApp, useTheme } from '../../../Context';

interface Props {
    key: string;
    name: string;
    sets: string;
    reps: string;
    info: string;
    index: number;
    onInsertPress: () => void;
    onDeletePress: () => void;
    handleOptionsPress: () => void;
}

export const ExerciseCard = ({
    name,
    sets,
    reps,
    info,
    index,
    onInsertPress,
    onDeletePress,
    handleOptionsPress,
}: Props) => {
    // CONTEXTS
    const { visible, options, selectedIndex } = useApp();
    const { theme } = useTheme();
    // STYLE
    const styles = useMemo(() => createStyles(theme, options, index, selectedIndex, visible), [theme, options, index, selectedIndex, visible]);

    return (
        <View style={styles.note}>
            <Pressable style={styles.optionsWrapper} onPress={handleOptionsPress}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.desc}>
                    {Tools.generateWorkoutDisplay(sets, reps, info)}
                </Text>
                <View style={styles.options}>
                    <Button onPress={onInsertPress} title='Edit'/>
                    <Button onPress={onDeletePress} title='Delete'/>
                </View>
            </Pressable>
        </View>
    );
};

const createStyles = (theme: Theme, options: boolean, index: number, selectedIndex: number, visible: boolean) =>
    StyleSheet.create({
        note: {
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
            zIndex: 1,
            boxShadow: '0px 0px 3px #a3a3a3',
            width: '100%',
            borderWidth: 1,
            borderColor: (options && index === selectedIndex && !visible) ? theme.background.accent : 'transparent',
        },
        title: {
            fontSize: 20,
            color: theme.text.primary,
        },
        desc: {
            fontSize: 16,
            color: theme.text.secondary,
        },
        optionsWrapper: { width: '100%' },
        options: {
            position: 'absolute',
            right: 0,
            flexDirection: 'row',
            gap: 5,
            display: (options && index === selectedIndex && !visible) ? 'flex' : 'none',
        },
    });
