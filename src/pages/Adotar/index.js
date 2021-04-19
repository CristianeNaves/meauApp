import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getPetsForAdoption, getPetLocalization} from '../../services/pet';
import {ListItem} from 'react-native-elements';
import { LargeImage } from '../../components/Image';
import {Button, Card} from 'react-native-paper';
import styles from './style';

import storage from '@react-native-firebase/storage';


const PetItem = ({navigation, pet}) => {

  const [petPhoto, setPetPhoto] = useState({uri: "https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png"});

  try {
    const image = storage().ref().child(pet.photoFile);
    // const image = images.child('image1');
    image.getDownloadURL().then((url) => { 
      setPetPhoto({ uri: url })
      // console.log(petPhoto);
    })
    .catch(error => {
      console.log("Não foi possível resgatar foto de animal.");
    });
  } catch (error) {
    console.log("Não foi possível resgatar foto de animal.");
  }

  return (
    <View>
      <ListItem
        key={pet.uid}
        bottomDivider
        onPress={() => {
          navigation.navigate('Pet', pet);
        }}>
        <LargeImage source={petPhoto.uri} />
        <ListItem.Content>
          <ListItem.Title>{pet.petName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const PetCard = ({navigation, pet}) => {
  const [localization, setLocalization] = useState('');

  const loadLocalization = async () => {
    const request = await getPetLocalization(pet.userId);
    setLocalization(request);
  };

  const [petPhoto, setPetPhoto] = useState({uri: "https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png"});

  try {
    const image = storage().ref().child(pet.photoFile);
    // const image = images.child('image1');
    image.getDownloadURL().then((url) => { 
      setPetPhoto({ uri: url })
      // console.log(petPhoto);
    })
    .catch(error => {
      console.log("Não foi possível resgatar foto de animal.");
    });
  } catch (error) {
    console.log("Não foi possível resgatar foto de animal.");
  }

  useEffect(() => {
    loadLocalization();
  }, []);
  return (
    <Card
      style={{marginTop: 12}}
      onPress={() => navigation.navigate('Pet', pet)}>
      <Card.Title
        title={pet.petName}
        style={{backgroundColor: '#fee29b'}}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: petPhoto.uri}} />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={styles.bottomInfo}>{pet.sexo}</Text>
        <Text style={styles.bottomInfo}>{pet.idade}</Text>
        <Text style={styles.bottomInfo}>{pet.porte}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
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


  // useEffect(() => {
  //   let isCancelled = false;
  //   getPetsForAdoption(user.uid).then((animals) => {
  //     console.log(animals);
  //     animals.forEach((animal) => {
  //       if (!isCancelled) {
  //         setPets((oldPets) => [...oldPets, {...animal.data(), id: animal.id}]);
  //       }
  //     });
  //   });
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  return (
    <View>
      {pets.map((pet) => (
        // <PetItem navigation={navigation} pet={pet} />
        <View key={pet.id}>
          <PetCard navigation={navigation} pet={{...pet.data(), id: pet.id}} />
        </View>
      ))}
    </View>
  );
}
