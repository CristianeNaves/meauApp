import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getAll} from '../../services/pet';
import {Button, Card} from 'react-native-paper';
import styles from './style';

const PetCard = ({navigation, pet}) => {
  return (
    <Card
      style={{marginTop: 12}}
      onPress={() => navigation.navigate('Pet', pet)}>
      <Card.Title
        title={pet.petName}
        style={{backgroundColor: '#cfe9e5'}}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Button labelStyle={styles.bottomInfo}>Interessados</Button>
      <Button labelStyle={styles.bottomInfo}>Apadrinhamento | Ajuda</Button>
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
          <PetCard navigation={navigation} pet={pet.data()} />
        </View>
      ))}
    </View>
  );
}
