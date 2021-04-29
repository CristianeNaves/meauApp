/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getChats} from '../../services/chat';
import {Button, Card} from 'react-native-paper';
import styles from './style';

import storage from '@react-native-firebase/storage';
import { update } from '../../services/pet';
import { Alert } from 'react-native';

import {adoptionConfirmNotification, adoptionNegationNotification} from '../../services/notifications';

const ChatItem = ({navigation, destinatario}) => {

  const [destinatarioPhoto, setDestinatarioPhoto] = useState({uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU'});

  try {
    const image = storage().ref().child(destinatario.photoFile);
    // const image = images.child('image1');
    image.getDownloadURL().then((url) => {
      setDestinatarioPhoto({ uri: url });
    })
    .catch(error => {
      console.log('Não foi possível resgatar foto do destinatario.');
    });
  } catch (error) {
    console.log('Não foi possível resgatar foto do destinatario.');
  }

  return (
    <Card
      style={{marginBottom: 12}}
      onPress={() => navigation.navigate('Chat', destinatario)}>
      <Card.Title
        title={destinatario.name}
        style={{backgroundColor: '#cfe9e5'}}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: destinatarioPhoto.uri}} />
      
      {/* <Button labelStyle={styles.bottomInfo}>Apadrinhamento | Ajuda</Button> */}
    </Card>
  );
};

export default function Chats({navigation}) {
  const {user} = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  // console.log(route);
  useEffect(() => {
    let isCancelled = false;
    getChats(user.userId).then((destinatarios) => {
      destinatarios.forEach((destinatario) => {
        if (!isCancelled) {
          setChats((oldChats) => [...oldChats, {...destinatario.data(), id: destinatario.id}]);
        }
      });

    });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View>
      {chats.map((destinatario) => (
        <ChatItem navigation={navigation} destinatario={destinatario} />
      ))}
    </View>
  );
}
