import React, {useState, useContext} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import {LargeButton} from '../../components/Button';
import {LargeImage} from '../../components/Image';
import AuthContext from '../../contexts/auth';
import {remove, sentAdoptionIntention} from '../../services/pet';

import storage from '@react-native-firebase/storage';

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

  const [petPhoto, setPetPhoto] = useState({
    uri:
      'https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png',
  });

  try {
    const image = storage().ref().child(pet.photoFile);
    // const image = images.child('image1');
    image
      .getDownloadURL()
      .then((url) => {
        setPetPhoto({uri: url});
      })
      .catch(() => {
        console.log('Não foi possível resgatar foto de animal.');
      });
  } catch (error) {
    console.log('Não foi possível resgatar foto de animal.');
  }

  return (
    <View>
      <View>
        <LargeImage source={petPhoto.uri} />
      </View>

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

      <View style={{marginBottom: 28}}>
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
            onPress={() => {
              if (pet.intentios != null && pet.intentios.length > 0)
                navigation.navigate('Interessados', pet);
              else Alert.alert('Não há interessados na adoção ainda.');
            }}>
            Interessados
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
          onPress={() => {
            sentAdoptionIntention(pet, user);
          }}>
          Pretendo Adotar
        </Button>
      )}
    </View>
  );
}
