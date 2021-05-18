import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getAll} from '../../services/pet';
import {Button, Card} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

const PetCard = ({navigation, pet}) => {
  const [petPhoto, setPetPhoto] = useState({
    uri:
      'https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png',
  });
  const styles = StyleSheet.create({
    cardTitle: {
      backgroundColor: '#cfe9e5',
    },
    margin: {
      marginBottom: 12,
    },
    bottomInfo: {
      color: '#434343',
      fontSize: 12,
      fontFamily: 'Roboto-Regular',
    },
    titleInfo: {
      color: '#434343',
      fontSize: 16,
      fontFamily: 'Roboto-Medium',
      textTransform: 'uppercase',
    },
  });

  try {
    const image = storage().ref().child(pet.photoFile);
    image
      .getDownloadURL()
      .then((url) => {
        setPetPhoto({uri: url});
      })
      .catch(() => {
        console.log('Não foi possível resgatar foto do interessado.');
      });
  } catch (error) {
    console.log('Não foi possível resgatar foto do interessado.');
  }

  return (
    <Card style={styles.margin} onPress={() => navigation.navigate('Pet', pet)}>
      <Card.Title
        title={pet.petName}
        style={[styles.cardTitle, styles.titleInfo]}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: petPhoto.uri}} />
      <Button
        labelStyle={styles.bottomInfo}
        onPress={() => {
          if (pet.intentios != null && pet.intentios.length > 0)
            navigation.navigate('Interessados', pet);
          else Alert.alert('Não há interessados na adoção ainda.');
        }}>
        Interessados
      </Button>
    </Card>
  );
};

export default function MeusPets({navigation}) {
  const {user} = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  const loadData = async () => {
    const request = await getAll(user.uid);
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
