import React from 'react';
import {View, Text} from 'react-native';
import {Input} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import styles from './style';

const TextInputField = ({placeholder, label, onChange, value}) => {
  return (
    <View>
      {label ? <Text style={styles.fieldTitle}>{label}</Text> : <></>}
      <Input placeholder={placeholder} value={value} onChangeText={onChange} />
    </View>
  );
};

const CheckBoxField = ({title, options, setOptions, bright, horizontal}) => {
  const color = bright ? styles.inputTextBright : styles.inputTextDark;
  const perspective = horizontal ? {} : styles.viewWrap;
  return (
    <View>
      {title ? <Text style={styles.fieldTitle}>{title}</Text> : <></>}
      <View style={perspective}>
        {Object.keys(options).map((key) => {
          return (
            <View style={styles.viewAlignedCenter}>
              <CheckBox
                disabled={false}
                value={options[key]}
                onValueChange={() =>
                  setOptions({...options, [key]: !options[key]})
                }
              />
              <Text style={[styles.inputText, color]}>{key}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RadioButtonField = ({selected, setSelected, options, title}) => {
  return (
    <View>
      <Text style={styles.fieldTitle}>{title}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setSelected(newValue)}
        value={selected}>
        <View style={styles.viewWrap}>
          {options.map((op) => {
            return (
              <View style={styles.viewAlignedCenter}>
                <RadioButton value={op} />
                <Text>{op}</Text>
              </View>
            );
          })}
        </View>
      </RadioButton.Group>
    </View>
  );
};

export {TextInputField, RadioButtonField, CheckBoxField};
