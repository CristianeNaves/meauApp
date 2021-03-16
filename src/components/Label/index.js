import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Label = ({label}) => {
  return (
    <View>
      <Text style={styles.fieldTitle}>{label}</Text>
    </View>
  );
};

export {Label};