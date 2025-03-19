// libraries
import React, { useMemo } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';

//context
import { useApp, Theme, useTheme } from '../../../Context/';

// components
import { ExerciseForm } from './ExerciseForm';

export const ExerciseInputModal = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const { visible, setVisible } = useApp();

    return (
        <>
            <Portal>
                <Dialog
                    style={styles.dialogWrapper}
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ExerciseForm />
                    </TouchableWithoutFeedback>
                </Dialog>
            </Portal>
        </>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        dialogWrapper: {
            marginTop: -350,
        },
    });
