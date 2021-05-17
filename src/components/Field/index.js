import React from 'react';
import {View, Text} from 'react-native';
import {Input} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import styles from './style';

const TextInputField = ({placeholder, label, onChange, value}) => {
  return (
    <View>
      {label ? (
        <Text style={{...styles.fieldTitle, marginBottom: 6, marginTop: 6}}>
          {label}
        </Text>
      ) : (
        <></>
      )}
      <Input placeholder={placeholder} value={value} onChangeText={onChange} />
    </View>
  );
};

const CheckBoxField = ({
  title,
  options,
  setOptions,
  bright,
  horizontal,
  width,
}) => {
  const color = bright ? styles.inputTextBright : styles.inputTextDark;
  const spacing = {width};
  const perspective = horizontal ? {} : styles.viewWrap;
  return (
    <View>
      {title ? (
        <Text style={{...styles.fieldTitle, marginBottom: 6, marginTop: 6}}>
          {title}
        </Text>
      ) : (
        <></>
      )}
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
              <Text style={[styles.inputText, color, spacing]}>{key}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RadioButtonField = ({selected, setSelected, options, title, width}) => {
  const spacing = {width};
  return (
    <View>
      <Text style={{...styles.fieldTitle, marginBottom: 6, marginTop: 6}}>
        {title}
      </Text>
      <RadioButton.Group
        onValueChange={(newValue) => setSelected(newValue)}
        value={selected}>
        <View style={styles.viewWrap}>
          {options.map((op) => {
            return (
              <View style={[styles.viewAlignedCenter, spacing]}>
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
