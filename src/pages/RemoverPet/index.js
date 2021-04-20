import React from 'react';
import {Text, View} from 'react-native';

export default function RemoverPet({route, navigation}) {
  const name = route.params.name ? route.params.name : {};
  return (
    <View>
      <Text>Pronto!</Text>
      <Text>O {name} foi removido da nossa lista com sucesso!</Text>
    </View>
  );
}
