import React from 'react';
import {Text, View} from 'react-native';

export default function PetAdotado({route, navigation}) {
  const name = route.params.name ? route.params.name : {};
  return (
    <View>
      <Text>Pronto!</Text>
      <Text>O {name} foi adotado!</Text>
    </View>
  );
}
