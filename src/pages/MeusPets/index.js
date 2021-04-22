import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getAll} from '../../services/pet';
import {ListItem} from 'react-native-elements';
import { LargeImage } from '../../components/Image';
import {Button, Card} from 'react-native-paper';
import styles from './style';


import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';

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
    <Card
      style={{marginBottom: 12}}
      onPress={() => navigation.navigate('Pet', pet)}>
      <Card.Title
        title={pet.petName}
        style={{backgroundColor: '#cfe9e5'}}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: petPhoto.uri}} />
      <Button labelStyle={styles.bottomInfo} onPress={() => {
        console.log(pet.intentios);
        if((pet.intentios != null) && (pet.intentios.length > 0))  navigation.navigate('Interessados', pet);
        else Alert.alert("Não há interessados na adoção ainda.");
      }}>Interessados</Button>
      {/* <Button labelStyle={styles.bottomInfo}>Apadrinhamento | Ajuda</Button> */}
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

  // useEffect(() => {
  //   let isCancelled = false;
  //   getAll(user.uid).then((animals) => {
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

  useEffect(() => {
    loadData();
  }, []);



  return (
    <View>
      <Text>Meus Pets Page</Text>
      {pets.map((pet) => (
        // <PetItem navigation={navigation} pet={pet} />
        <View key={pet.id}>
          <PetCard navigation={navigation} pet={{...pet.data(), id: pet.id}} />
        </View>
      ))}
    </View>
  );
}
