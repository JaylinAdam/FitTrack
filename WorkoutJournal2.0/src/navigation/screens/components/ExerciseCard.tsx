import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Theme, useApp, useTheme } from '../../../Context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
    key: string;
    index: number;
    name: string | undefined;
    sets: string | undefined;
    reps: string | undefined;
    info: string | undefined;
    onPress: () => void;
}

export const ExerciseCard = ({ name, sets, reps, info, onPress }: Props) => {
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
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.note}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.desc}>{generateDisplay(sets, reps, info)}</Text>
            </View>
        </TouchableWithoutFeedback>
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
