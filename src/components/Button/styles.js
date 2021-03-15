import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 2,
  },
  largeButton: {
    width: 232,
    height: 40,
    fontSize: 12,
  },
  smallButton: {
    width: '100dp',
    height: '40dp',
  },
  orangeButton: {
    backgroundColor: '#ffd358',
  },
  blueButton: {
    backgroundColor: '#88c9bf',
  },
  facebookButton: {
    backgroundColor: '#194f7c',
  },
  gmailButton: {
    backgroundColor: '#f15f5c',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#434343',
  },
});

export default styles;
