import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme, useApp, Tools } from '../../../Context';
import { Exercise, KeyType } from '../../../../models';
import { Icon, Input } from '.';

interface Props {
    index: number;
}

export const ExerciseForm = ({ index }: Props) => {
    // CONTEXTS
    const { theme } = useTheme();
    const { setVisible, handleExSubmit, TARGET_DATE, targetSession } = useApp();
    // STYLE
    const styles = useMemo(() => createStyles(theme), [theme]);
    // STATES
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    // METHOD: update states with valid inputs
    const handleUpdateInput = (
        value: string,
        setMethod: React.Dispatch<React.SetStateAction<string>>,
        type: KeyType = KeyType.default,
    ) => {
        switch (type) {
            case KeyType.numeric:
                if (Tools.isOnlyNumbers(value)) {
                    setMethod(value);
                }
                break;
            case KeyType.default:
                setMethod(value);
                break;
        }
    };

    // METHOD: close modal (set visibility)
    const handleClose = () => {
        setVisible(false);
    };

    // METHOD: check if exercise submissions is valid
    const validSubmission = ({ name, reps, sets, info }: Exercise) =>
        Tools.hasValue(name) && [info, reps, sets].some(Tools.hasValue);

    // METHOD: submit valid exercise and close modal
    const handleSubmit = () => {
        const exercise: Exercise = new Exercise(name, info, reps, sets);
        if (validSubmission(exercise)) {
            handleExSubmit(exercise, index);
            handleClose();
        }
    };

    // initialize states (if target session and target exercise set existing exercise values)
    useEffect(() => {
        if (targetSession && index >= 0) {
            var targetExercise = targetSession.exercises[index];
            setName(targetExercise.name ?? '');
            setInfo(targetExercise.info ?? '');
            setSets(targetExercise.sets ?? '');
            setReps(targetExercise.reps ?? '');
        }
    }, [index]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{TARGET_DATE}</Text>
            <View style={styles.row}>
                <Input
                    title="Exercise"
                    value={name}
                    onChange={value => handleUpdateInput(value, setName)}
                    keyType={KeyType.default}
                />

                <Input
                    title="Info"
                    value={info}
                    onChange={value => handleUpdateInput(value, setInfo)}
                    keyType={KeyType.default}
                />
            </View>
            <View style={styles.row}>
                <Input
                    title="Sets"
                    value={sets}
                    onChange={value =>
                        handleUpdateInput(value, setSets, KeyType.numeric)
                    }
                    keyType={KeyType.numeric}
                />
                <Input
                    title="Reps"
                    value={reps}
                    onChange={value =>
                        handleUpdateInput(value, setReps, KeyType.numeric)
                    }
                    keyType={KeyType.numeric}
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
