import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme, useTheme } from '../../../Context';

interface Props {
    key: string;
    name: string | undefined;
    sets: string | undefined;
    reps: string | undefined;
    info: string | undefined;
}

export const ExerciseCard = ({ name, sets, reps, info }: Props) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const generateDisplay = (
        sets: string | undefined,
        reps: string | undefined,
        info: string | undefined,
    ) => {
        let x = sets || reps ? 'x' : '';
        let showInfo = info ? `•${info}` : '';

        return sets + x + reps + showInfo;
    };

    return (
        <View style={styles.note}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc}>{generateDisplay(sets, reps, info)}</Text>
        </View>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        note: {
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
            boxShadow: '0px 0px 3px #a3a3a3',
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
