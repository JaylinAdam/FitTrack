import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Theme, useTheme } from '../../../Context';

interface Props {
    antIconName: any;
    size?: number;
    color?: string;
    style?: any;
    onPress: () => void;
    bgColor?: string;
}

export const Icon = ({
    antIconName,
    size,
    color,
    style,
    onPress,
    bgColor,
}: Props) => {
    const { theme } = useTheme();

    const styles = useMemo(
        () => createStyles(theme, bgColor),
        [bgColor, theme],
    );

    return (
        <AntDesign
            name={antIconName}
            size={size ? size : 25}
            color={color ? color : 'white'}
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
            opacity: 0.55,
            backgroundColor: bgColor ? bgColor : theme.background.primary,
        },
    });
