import React, { useMemo } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Theme, Tools, useTheme } from '../../../Context';

interface Props {
    key: string;
    name: string;
    sets: string;
    reps: string;
    info: string;
    onPress: (() => void) | undefined;
}

export const ExerciseCard = ({ name, sets, reps, info, onPress }: Props) => {
    // CONTEXTS
    const { theme } = useTheme();
    // STYLE
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <Pressable style={styles.note} onPress={onPress}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc}>
                {Tools.generateWorkoutDisplay(sets, reps, info)}
            </Text>
        </Pressable>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        note: {
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
            boxShadow: '0px 0px 3px #a3a3a3',
            width: '100%',
        },
        title: {
            fontSize: 20,
            color: theme.text.primary,
        },
        desc: {
            fontSize: 16,
            color: theme.text.secondary,
        },
    });
