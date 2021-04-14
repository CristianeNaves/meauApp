import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

const LargeImage = ({source}) => {
  return (
    <View>
      <Image source={ {uri: source} } style={styles.largeImage} />
    </View>
  );
};

const SmallImage = ({source}) => {
  return (
    <View>
      <Image source={ {uri: source} } style={styles.smallImage} />
    </View>
  );
};

export {LargeImage, SmallImage};
