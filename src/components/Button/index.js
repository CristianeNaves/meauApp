import React from 'react';
import {Button, View} from 'react-native';
import styles from './styles';

const LargeButton = ({title, onPress, type}) => {
  return (
    <View>
      <Button title={title} style={styles.largeButton} />
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
