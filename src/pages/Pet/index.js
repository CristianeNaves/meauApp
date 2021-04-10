import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import AuthContext from '../../contexts/auth';
import {remove} from '../../services/pet';

export default function Pet({route, navigation}) {
  const [pet, setPet] = useState(route.params ? route.params : {});
  const {user} = useContext(AuthContext);
  const colorStyle =
    user.uid === pet.userId
      ? styles.infoTitleMeusPets
      : styles.infoTitleAdoption;
  function getTemperamentos(temperamentos) {
    let t = [];
    Object.keys(temperamentos).forEach((temp) => {
      if (temperamentos[temp]) {
        t.push(temp);
      }
    });
    return t.join(', ');
  }

  function getExigencias(exigencias) {
    let e = [];
    Object.keys(exigencias).forEach((temp) => {
      if (exigencias[temp]) {
        e.push(temp);
      }
    });
    return e.join(', ');
  }

  return (
    <View>
      <View>
        <Text style={styles.title}>{pet.petName}</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Sexo</Text>
          <Text style={styles.info}>{pet.sexo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Porte</Text>
          <Text style={styles.info}>{pet.porte}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Idade</Text>
          <Text style={styles.info}>{pet.idade}</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Castrado</Text>
          <Text style={styles.info}>{pet.saude.castrado ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Vermifugado</Text>
          <Text style={styles.info}>
            {pet.saude.vermifugado ? 'Sim' : 'Não'}
          </Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Vacinado</Text>
          <Text style={styles.info}>{pet.saude.vacinado ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, colorStyle]}>Doenças</Text>
          <Text style={styles.info}>
            {pet.saude.doente ? pet.doencas : 'Não'}
          </Text>
        </View>
      </View>

      <View style={styles.line} />

      <View>
        <Text style={[styles.infoTitle, colorStyle]}>Temperamento</Text>
        <Text style={styles.info}>{getTemperamentos(pet.temperamentos)}</Text>
      </View>

      <View style={styles.line} />

      <View>
        <Text style={[styles.infoTitle, colorStyle]}>Exigências do doador</Text>
        <Text style={styles.info}>{getExigencias(pet.exigencias)}</Text>
      </View>

      <View style={styles.line} />

      <View style={{marginBottom:28}}>
        <Text style={[styles.infoTitle, colorStyle]}>
          Mais sobre {pet.petName}
        </Text>
        <Text style={styles.info}>
          {pet.sobre ? pet.sobre : 'Nenhuma informação adicional.'}
        </Text>
      </View>

      {user.uid === pet.userId ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            color="#88c9bf"
            labelStyle={{
              color: '#757575',
              fontFamily: 'Roboto Medium',
              fontSize: 12,
            }}
            onPress={() => {}}>
            Ver interessados
          </Button>
          <Button
            mode="contained"
            color="#88c9bf"
            labelStyle={{
              color: '#757575',
              fontFamily: 'Roboto Medium',
              fontSize: 12,
            }}
            onPress={() => {
              remove(pet.id).then(() => {
                navigation.navigate('Remover pet', {name: pet.petName});
              });
            }}>
            Remover Pet
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          labelStyle={{
            color: '#434343',
            fontSize: 12,
            fontFamily: 'Roboto Medium',
          }}
          color="#fdcf58"
          onPress={() => {}}>
          Pretendo Adotar
        </Button>
      )}
    </View>
  );
}
