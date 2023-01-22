import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getPetsForAdoption, getPetLocalization} from '../../services/pet';
import {Card} from 'react-native-paper';

import storage from '@react-native-firebase/storage';

const PetCard = ({navigation, pet}) => {
  const styles = StyleSheet.create({
    cardTitle: {
      backgroundColor: '#fee29b',
    },
    margin: {
      marginBottom: 12,
    },
    titleInfo: {
      color: '#434343',
      fontSize: 16,
      fontFamily: 'Roboto-Medium',
      textTransform: 'uppercase',
    },
    bottomInfo: {
      color: '#434343',
      fontSize: 12,
      fontFamily: 'Roboto-Regular',
      textTransform: 'uppercase',
    },
    bottomStyle: {flexDirection: 'row', justifyContent: 'space-around'},
    local: {alignItems: 'center'},
  });
  const [localization, setLocalization] = useState('');

  const loadLocalization = async () => {
    const request = await getPetLocalization(pet.userId);
    setLocalization(request);
  };

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

  useEffect(() => {
    loadLocalization();
  }, []);

  return (
    <Card style={styles.margin} onPress={() => navigation.navigate('Pet', pet)}>
      <Card.Title
        title={pet.petName}
        style={styles.cardTitle}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: petPhoto.uri}} />
      <View style={styles.bottomStyle}>
        <Text style={styles.bottomInfo}>{pet.sexo}</Text>
        <Text style={styles.bottomInfo}>{pet.idade}</Text>
        <Text style={styles.bottomInfo}>{pet.porte}</Text>
      </View>
      <View style={styles.local}>
        <Text style={styles.bottomInfo}>
          {localization
            ? `${localization.city} - ${localization.state}`
            : 'localização não informada'}
        </Text>
      </View>
    </Card>
  );
};

export default function Adotar({navigation}) {
  const {user} = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  const loadData = async () => {
    const request = await getPetsForAdoption(user.uid);
    const data = await request.docs;
    setPets(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {pets.map((pet) => (
        <View key={pet.id}>
          <PetCard navigation={navigation} pet={{...pet.data(), id: pet.id}} />
        </View>
      ))}
    </View>
  );
}
