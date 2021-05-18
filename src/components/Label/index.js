/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Label = ({label, color}) => {
  if (!color) {
    color = '#f7a800';
  }

  return (
    <View>
      <Text style={{...styles.fieldTitle, color}}>{label}</Text>
    </View>
  );
};

export {Label};
