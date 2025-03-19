import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme, Theme } from '../../../Context';
import { KeyType } from '../../../../models';

interface Props {
    title: string;
    value: string;
    onChange: (text: string) => void;
    keyType: KeyType;
}

export const Input = ({ title, value, onChange, keyType }: Props) => {
    // CONTEXT
    const { theme } = useTheme();
    // STYLE
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.column}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                keyboardType={keyType}
                onChangeText={onChange}
                value={value}
            />
        </View>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        column: {
            flex: 1,
            padding: 10,
        },

        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
            color: theme.text.primary,
        },
        input: {
            fontSize: 15,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: theme.text.tertiary,
            color: theme.text.secondary,
        },
    });
