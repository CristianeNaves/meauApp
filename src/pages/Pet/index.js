import React, {useState, useContext} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import styles from './style';
import {Button} from 'react-native-elements';
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
      <View style={{alignItems: 'center'}}>
        <LargeImage source={petPhoto.uri} />
      </View>

      <View style={{marginTop: 16}}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 28,
            marginTop: 28,
          }}>
          <Button
            title="INTERESSADOS"
            titleStyle={{color: '#757575'}}
            buttonStyle={{
              width: 148,
              height: 50,
              backgroundColor: '#88c9bf',
              marginRight: 16,
            }}
            onPress={() => {
              if (pet.intentios != null && pet.intentios.length > 0)
                navigation.navigate('Interessados', pet);
              else Alert.alert('Não há interessados na adoção ainda.');
            }}
          />
          <Button
            title="REMOVER PET"
            titleStyle={{color: '#757575'}}
            buttonStyle={{width: 148, height: 50, backgroundColor: '#88c9bf'}}
            onPress={() => {
              remove(pet.id).then(() => {
                const image = storage().ref().child(pet.photoFile);
                image.delete().then(() => {console.log("Foto de pet removida")}).catch((error) => {console.log("Erro: " + error)});
                navigation.navigate('Remover pet', {name: pet.petName});
              });
            }}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center', marginBottom: 28, marginTop: 28}}>
          <Button
            title="PRETENDO ADOTAR"
            titleStyle={{color: '#434343'}}
            buttonStyle={{width: 232, height: 50, backgroundColor: '#fdcf58'}}
            onPress={() => {
              sentAdoptionIntention(pet, user);
            }}
          />
        </View>
      )}
    </View>
  );
}
