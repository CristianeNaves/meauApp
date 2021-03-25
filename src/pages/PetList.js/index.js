import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getAll} from '../../services/pet';
import {ListItem} from 'react-native-elements';

export default function PetList({navigation}) {
  const {user} = useContext(AuthContext);
  getAll(user.uid).then((pets) => {
    pets.forEach((pet) => {
      console.log(pet.data());
      //petList.push(pet.data());
    });
  });

  return (
    <View>
      <Text>Meus Pets Page</Text>
    </View>
  );
}
