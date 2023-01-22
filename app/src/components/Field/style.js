import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fieldTitle: {
    color: '#f7a800',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  viewWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewAlignedCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  inputTextDark: {
    color: '#757575',
  },
  inputTextBright: {
    color: '#bdbdbd',
  },
  leftContainer: {
    marginLeft: '60dp',
  },
});

export default styles;
