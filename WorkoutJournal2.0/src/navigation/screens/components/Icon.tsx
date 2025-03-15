import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    antIconName: any;
    size: number;
    color: string | undefined;
    style?: any;
    onPress: () => void;
}

export const Icon = ({
    antIconName,
    size,
    color,
    style,
    onPress,
}: Props) => {
    return (
        <AntDesign
            name={antIconName}
            size={size}
            color={color}
            style={[styles.icon, { ...style }]}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        padding: 8,
        borderRadius: 50,
        elevation: 5,
    },
});
