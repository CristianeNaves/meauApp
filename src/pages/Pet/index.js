import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';

export default function Pet({route, navigation}) {
  const [pet, setPet] = useState(route.params ? route.params : {});
  return (
    <View>
      <View>
        <Text>{pet.petName}</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Sexo</Text>
          <Text>{pet.sexo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Porte</Text>
          <Text>{pet.porte}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Idade</Text>
          <Text>{pet.idade}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Castrado</Text>
          <Text>{pet.saude.castrado ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Vermifugado</Text>
          <Text>{pet.saude.vermifugado ? 'Sim' : 'Não'}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Vacinado</Text>
          <Text>{pet.saude.vacinado ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Doenças</Text>
          <Text>{pet.saude.doente ? pet.doencas : 'Não'}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.infoTitle}>Temperamento</Text>
        <Text>
          {Object.keys(pet.temperamentos).forEach((temp) => {
            if (pet.temperamentos[temp]) {
              return String(temp);
            }
          })}
        </Text>
      </View>

      <View>
        <Text style={styles.infoTitle}>
          {pet.sexo === 'Macho' ? 'O' : 'A'} {pet.petName} precisa de
        </Text>
      </View>

      <View>
        <Text style={styles.infoTitle}>Exigências do doador</Text>
      </View>
      <View>
        <Text style={styles.infoTitle}>Mais sobre {pet.petName}</Text>
        <Text>{pet.sobre ? pet.sobre : 'Nenhuma informação adicional.'}</Text>
      </View>
    </View>
  );
}
