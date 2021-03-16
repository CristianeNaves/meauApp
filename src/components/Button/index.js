import React from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const LargeButton = ({title, onPress, style}) => {
  return (
    <View>
      <Button title={title} style={styles.largeButton} onPress={onPress} />
    </View>
  );
};

const SmallButton = ({title, onPress, type}) => {
  return (
    <View>
      <Button title={title} />
    </View>
  );
};

export {LargeButton};
