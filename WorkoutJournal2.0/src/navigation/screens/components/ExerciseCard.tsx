import React, { useMemo } from 'react';
import { Text, StyleSheet, Pressable, Button } from 'react-native';
import { Theme, useTheme } from '../../../Context';

interface Props {
    key: string;
    name: string;
    sets: string;
    reps: string;
    info: string;
    onInsertPress: () => void;
    onDeletePress: () => void;

}

export const ExerciseCard = ({ name, sets, reps, info, onInsertPress, onDeletePress }: Props) => {
    // CONTEXTS
    const { theme } = useTheme();
    // STYLE
    const styles = useMemo(() => createStyles(theme), [theme]);

    // METHOD: generate display for exercise
    const generateDisplay = (sets: string, reps: string, info: string) => {
        const x = sets || reps ? 'x' : '';
        const showInfo = info ? `•${info}` : '';

        return sets + x + reps + showInfo;
    };

    return (
        <Pressable style={styles.note} onPress={onInsertPress}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc}>{generateDisplay(sets, reps, info)}</Text>
            <Button onPress={onDeletePress} title="Delete" />
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
