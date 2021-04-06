import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {LargeButton} from '../../components/Button';
import AuthContext from '../../contexts/auth';
import {remove} from '../../services/pet';

export default function Pet({route, navigation}) {
  const [pet, setPet] = useState(route.params ? route.params : {});
  const {user} = useContext(AuthContext);

  function getTemperamentos(temperamentos) {
    let t = [];
    Object.keys(temperamentos).forEach((temp) => {
      if (temperamentos[temp]) {
        t.push(temp);
      }
    });
    return t.join(',');
  }

  function getExigencias(exigencias) {
    let e = [];
    Object.keys(exigencias).forEach((temp) => {
      if (exigencias[temp]) {
        e.push(temp);
      }
    });
    return e.join(',');
  }

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

      <View style={styles.line} />

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

      <View style={styles.line} />

      <View>
        <Text style={styles.infoTitle}>Temperamento</Text>
        <Text>{getTemperamentos(pet.temperamentos)}</Text>
      </View>

      <View style={styles.line} />

      {/*<View>
        <Text style={styles.infoTitle}>
          {pet.sexo === 'Macho' ? 'O' : 'A'} {pet.petName} precisa de
        </Text>
      </View>*/}

      <View style={styles.line} />

      <View>
        <Text style={styles.infoTitle}>Exigências do doador</Text>
        <Text>{getExigencias(pet.exigencias)}</Text>
      </View>

      <View style={styles.line} />

      <View>
        <Text style={styles.infoTitle}>Mais sobre {pet.petName}</Text>
        <Text>{pet.sobre ? pet.sobre : 'Nenhuma informação adicional.'}</Text>
      </View>

      {user.uid === pet.userId ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <LargeButton title="Ver interessados" onPress={() => {}} />
          <LargeButton
            title="Remover pet"
            onPress={() => {
              console.warn(pet);
              remove(pet.id).then((response) => {
                navigation.navigate('Remover pet', {name: pet.petName});
              });
            }}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
