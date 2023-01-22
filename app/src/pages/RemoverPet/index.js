import React from 'react';
import {Text, View} from 'react-native';

export default function RemoverPet({route, navigation}) {
  const name = route.params.name ? route.params.name : {};
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 16, color: '#757575'}}>
        Pronto!
      </Text>
      <Text style={{textAlign: 'center', fontSize: 16, color: '#757575'}}>
        O {name} foi removido da nossa lista com sucesso!
      </Text>
    </View>
  );
}
