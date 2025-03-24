import React, { useMemo, useState } from 'react';
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
    // STATES
    const [isFocused, setIsFocused] = useState<boolean>(false);
    // STYLE
    const styles = useMemo(
        () => createStyles(theme, isFocused),
        [theme, isFocused],
    );

    return (
        <View style={styles.column}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                keyboardType={keyType}
                onChangeText={onChange}
                value={value}
                selectionColor={theme.text.accent}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const createStyles = (theme: Theme, isFocused: boolean) =>
    StyleSheet.create({
        column: {
            width: '100%',
            padding: 5,
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: isFocused
                ? theme.background.accent
                : theme.background.tertiary,
        },

        title: {
            fontSize: 14,
            fontWeight: 'semibold',
            color: theme.text.tertiary,
            marginLeft: 5,
            marginBottom: -20,
        },
        input: {
            fontSize: 18,
            borderWidth: 0,
            paddingLeft: 5,
            paddingTop: 25,
            borderColor: theme.text.tertiary,
            color: theme.text.secondary,
            zIndex: 10,
        },
    });
