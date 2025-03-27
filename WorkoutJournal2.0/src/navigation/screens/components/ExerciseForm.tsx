import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme, useApp, Tools } from '../../../Context';
import { Exercise, KeyType } from '../../../../models';
import { ExerciseCard, Icon, Input } from '.';

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
            <View style={styles.column}>
                <Input
                    title="Exercise"
                    value={name}
                    onChange={value => handleUpdateInput(value, setName)}
                    keyType={KeyType.default}
                />
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
                <Input
                    title="Info"
                    value={info}
                    onChange={value => handleUpdateInput(value, setInfo)}
                    keyType={KeyType.default}
                />
                {!!(name || reps || sets || info) && (
                    <>
                        <Text style={styles.preview}>Preview</Text>
                        <ExerciseCard
                            key="tempExerciseCard"
                            name={name}
                            reps={reps}
                            sets={sets}
                            info={info}
                            onPress={undefined}
                        />
                    </>
                )}
            </View>
            <View style={styles.btnContainer}>
                <Icon
                    antIconName="check"
                    size={25}
                    bgColor={
                        validSubmission({ reps, sets, info, name })
                            ? theme.button.submit
                            : theme.button.disabled
                    }
                    style={styles.submitIcon}
                    onPress={handleSubmit}
                    disabled={!validSubmission({ reps, sets, info, name })}
                />

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
            padding: 20,
        },
        column: {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },

        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text.primary,
        },

        btnContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 15,
        },
        submitIcon: {
            marginRight: 15,
        },
        preview: {
            fontSize: 15,
            fontWeight: 'semibold',
            marginTop: 10,
            color: theme.text.primary,
        },
    });
