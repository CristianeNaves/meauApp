import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';

const CheckBoxField = ({title, options, setOptions}) => {
  return (
    <View>
      <Text style={{color: "#f7a800", fontSize: 12}}>{title}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {Object.keys(options).map((key) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={options[key]}
                onValueChange={() =>
                  setOptions({...options, [key]: !options[key]})
                }
              />
              <Text style={{color: '#757575', fontSize: 14}}>{key}</Text>
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
      <Text style={{color: "#f7a800", fontSize: 12}}>{title}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setSelected(newValue)}
        value={selected}>
        <View style={{flexDirection: 'row'}}>
          {options.map((op) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

export {CheckBoxField, RadioButtonField};
