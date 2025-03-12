import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    antIconName: any;
    size: number;
    color: string;
    style?: any;
    onPress: () => void;
    bgColor: string;
}

export const Icon = ({
    antIconName,
    size,
    color,
    style,
    onPress,
    bgColor,
}: Props) => {
    return (
        <AntDesign
            name={antIconName}
            size={size}
            color={color}
            style={[styles.icon, { ...style }]}
            backgroundColor={bgColor}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        padding: 8,
        borderRadius: 50,
        elevation: 5,
        opacity: 0.55,
    },
});
