import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme, useApp } from '../../../Context';
import { Icon, Input } from '.';
import { Exercise } from '../../../../models';

export const ExerciseForm = () => {
    const { theme } = useTheme();
    const { setVisible, hasValue, handleExSubmit, TARGET_DATE } = useApp();

    const styles = useMemo(() => createStyles(theme), [theme]);

    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const validSubmission = ({ name, reps, sets, info }: Exercise) =>
        hasValue(name) && (hasValue(info) || hasValue(reps) || hasValue(sets));

    const handleClose = () => {
        setVisible(false);
    };

    const handleSubmit = () => {
        const exercise: Exercise = new Exercise(name, info, reps, sets);
        if (validSubmission(exercise)) {
            handleExSubmit(exercise);
            handleClose();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{TARGET_DATE}</Text>
            <View style={styles.row}>
                <Input
                    title="Exercise"
                    value={name}
                    onChange={setName}
                    keyType="default"
                />

                <Input
                    title="Info"
                    value={info}
                    onChange={setInfo}
                    keyType="default"
                />
            </View>
            <View style={styles.row}>
                <Input
                    title="Sets"
                    value={sets}
                    onChange={setSets}
                    keyType="numeric"
                />
                <Input
                    title="Reps"
                    value={reps}
                    onChange={setReps}
                    keyType="numeric"
                />
            </View>
            <View style={styles.btnContainer}>
                {validSubmission({
                    reps,
                    sets,
                    info,
                    name,
                }) && (
                    <Icon
                        antIconName="check"
                        size={25}
                        bgColor={theme.button.submit}
                        style={styles.submitIcon}
                        onPress={handleSubmit}
                    />
                )}
                <Icon
                    antIconName="close"
                    size={25}
                    bgColor={theme.button.close}
                    onPress={handleClose}
                />
            </View>
        </View>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            paddingTop: 20,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
            color: theme.text.primary,
        },

        btnContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 25,
        },
        submitIcon: {
            marginRight: 15,
        },
    });
