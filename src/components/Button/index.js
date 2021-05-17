import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './styles';

const LargeButton = ({title, onPress, color}) => {
  return (
    <View style={styles.button}>
      <Button
        titleStyle={styles.buttonText}
        buttonStyle={[styles.largeButton, {backgroundColor: color}]}
        title={title}
        onPress={onPress}
      />
    </View>
  );
};

const SmallButton = ({title, onPress, type}) => {
  return (
    <View>
      <Button title={title} style={styles.smallButton} onPress={onPress}/>
    </View>
  );
};

export {LargeButton, SmallButton};
