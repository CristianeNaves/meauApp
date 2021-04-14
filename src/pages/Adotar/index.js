import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getPetsForAdoption} from '../../services/pet';
import {ListItem} from 'react-native-elements';
import { LargeImage } from '../../components/Image';

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

export default function Adotar({navigation}) {
  const {user} = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    getPetsForAdoption(user.uid).then((animals) => {
      console.log(animals);
      animals.forEach((animal) => {
        if (!isCancelled) {
          setPets((oldPets) => [...oldPets, {...animal.data(), id: animal.id}]);
        }
      });
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View>
      {pets.map((pet) => (
        <PetItem navigation={navigation} pet={pet} />
      ))}
    </View>
  );
}
