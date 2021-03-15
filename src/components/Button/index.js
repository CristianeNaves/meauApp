import React from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const LargeButton = ({title, onPress, style}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
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
