// libraries
import React, { useMemo } from 'react';
import { Keyboard, StyleSheet, View, Modal, Pressable } from 'react-native';

//context
import { useApp, Theme, useTheme } from '../../../Context/';

// components
import { ExerciseForm } from './ExerciseForm';

export const ExerciseInputModal = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const { visible, setVisible } = useApp();

    const handleDismiss = () => {
        setVisible(false); // Close modal on background click
        Keyboard.dismiss(); // Optionally dismiss keyboard when modal closes
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            {/* Dismiss modal if clicking on overlay space */}
            <Pressable onPress={handleDismiss} style={styles.overlay}>
                {/* Prevent dismissing when clicking inside the modal */}
                <Pressable onPress={() => {}} style={styles.dialogWrapper}>
                    <View style={styles.dialog}>
                        <ExerciseForm />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
            paddingTop: 75,
            alignItems: 'center',
        },
        dialogWrapper: {
            width: '100%',
            padding: 10,
        },
        dialog: {
            width: '100%',
            backgroundColor: theme.background.secondary,
            borderRadius: 10,
        },
    });
