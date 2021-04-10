import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getPetsForAdoption, getPetLocalization} from '../../services/pet';
import {Button, Card} from 'react-native-paper';
import styles from './style';

const PetCard = ({navigation, pet}) => {
  const [localization, setLocalization] = useState('');

  const loadLocalization = async () => {
    const request = await getPetLocalization(pet.userId);
    setLocalization(request);
  };

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
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
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

export default function MeusPets({navigation}) {
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
