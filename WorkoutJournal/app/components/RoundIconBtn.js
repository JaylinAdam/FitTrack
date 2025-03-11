import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {  
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
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    opacity: 0.55
  },
});

export default RoundIconBtn;