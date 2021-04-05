import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getAll} from '../../services/pet';
import {ListItem} from 'react-native-elements';

const PetItem = ({navigation, pet}) => {
  return (
    <View>
      <ListItem
        key={pet.uid}
        bottomDivider
        onPress={() => {
          navigation.navigate('Pet', pet);
        }}>
        <ListItem.Content>
          <ListItem.Title>{pet.petName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default function PetList({navigation}) {
  const {user} = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    getAll(user.uid).then((animals) => {
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
      <Text>Meus Pets Page</Text>
      {pets.map((pet) => (
        <PetItem navigation={navigation} pet={pet} />
      ))}
    </View>
  );
}
