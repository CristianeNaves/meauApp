import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getInteressados} from '../../services/user';
import {ListItem} from 'react-native-elements';
import { LargeImage } from '../../components/Image';

import storage from '@react-native-firebase/storage';
import { update } from '../../services/pet';

const InteressadoItem = ({navigation, interessado, pet}) => {

  const [interessadoPhoto, setInteressadoPhoto] = useState({uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU"});

  try {
    const image = storage().ref().child(interessado.photoFile);
    // const image = images.child('image1');
    image.getDownloadURL().then((url) => { 
      setInteressadoPhoto({ uri: url })
    })
    .catch(error => {
      console.log("Não foi possível resgatar foto do interessado.");
    });
  } catch (error) {
    console.log("Não foi possível resgatar foto do interessado.");
  }

  return (
    <View>
      <ListItem
        key={interessado.id}
        bottomDivider
        onPress={() => {
          // navigation.navigate('Perfil', interessado);
          pet.intentios = null;
          pet.userId = interessado.id;
          update(pet.id, pet).then((response) => {
            navigation.navigate('Adotar pet', {name: pet.petName});
          });
        }}>
        <LargeImage source={interessadoPhoto.uri} />
        <ListItem.Content>
          <ListItem.Title>{interessado.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default function Interessados({navigation, route}) {
  const {user} = useContext(AuthContext);
  const [interessados, setInteressados] = useState([]);

  // console.log(route);
  useEffect(() => {
    let isCancelled = false;
    getInteressados(route.params).then((intentions) => {
      console.log("intentions");
      console.log(intentions);
      intentions.forEach((interessado) => {
        if (!isCancelled) {
          setInteressados((oldInteressados) => [...oldInteressados, {...interessado.data(), id: interessado.id}]);
          console.log("interessados");
          console.log(interessados);
        }
      });
      
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View>
      {interessados.map((interessado) => (
        <InteressadoItem navigation={navigation} interessado={interessado} pet={route.params} />
      ))}
    </View>
  );
}
