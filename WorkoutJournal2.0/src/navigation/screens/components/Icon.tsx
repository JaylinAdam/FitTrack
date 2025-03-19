import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Theme, useTheme } from '../../../Context';

interface Props {
    antIconName: any;
    size?: number;
    color?: string;
    bgColor?: string;
    style?: any;
    onPress: () => void;
}

export const Icon = ({
    antIconName,
    size,
    color,
    bgColor,
    style,
    onPress,
}: Props) => {
    // CONTEXT
    const { theme } = useTheme();
    // STYLE
    const styles = useMemo(
        () => createStyles(theme, bgColor),
        [bgColor, theme],
    );

    return (
        <AntDesign
            name={antIconName}
            size={size ?? 40}
            color={color ?? theme.text.quaternary}
            style={[styles.icon, { ...style }]}
            onPress={onPress}
        />
    );
};

const createStyles = (theme: Theme, bgColor?: string) =>
    StyleSheet.create({
        icon: {
            padding: 8,
            borderRadius: 50,
            elevation: 5,
            backgroundColor: bgColor ? bgColor : theme.background.primary,
        },
    });
