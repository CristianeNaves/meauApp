/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getChats} from '../../services/chat';
import {Button, Card} from 'react-native-paper';
import styles from './style';

import storage from '@react-native-firebase/storage';
import { get } from '../../services/user';
import { Alert } from 'react-native';

import {adoptionConfirmNotification, adoptionNegationNotification} from '../../services/notifications';

const ChatItem = ({navigation, conversa}) => {
  console.log('CHATS: conversa: ', conversa);
  const [chat, setChat] = useState(conversa);
  const {user} = useContext(AuthContext);
  const destinatarioID = (conversa.users[0] === user.uid) ? conversa.users[1] : conversa.users[0];
  const [destinatarioPhoto, setDestinatarioPhoto] = useState({uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU'});
  const [destinatario, setDestinatario] = useState();

  const loadPhoto = async () => {
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
  };
  const loadData = async () => {
    const request = await get(destinatarioID);
    const data = await request.data();
    console.log('data: ', data);
    setDestinatario(data);
  };

  useEffect(() => {
    loadData().then(() => {
      loadPhoto();
    });
    /*
    let isCancelled = false;
    get(destinatarioID).then((response) => {
      console.log(response.data());
      setDestinatario(response.data());
      loadPhoto();
    });
    return () => {
      isCancelled = true;
      return (
        <View>Erro procurando chats</View>
      );
    };*/
  }, []);


  if (destinatario){
    return (
      <Card
        style={{marginBottom: 12}}
        // onPress={() => navigation.navigate('Chat', {...destinatario, id: destinatarioID})}>
        onPress={() => navigation.navigate('Chat', conversa)}>
        <Card.Title
          title={destinatario.name}
          style={{backgroundColor: '#cfe9e5'}}
          titleStyle={styles.titleInfo}
        />
        <Card.Cover source={{uri: destinatarioPhoto.uri}} />

        {/* <Button labelStyle={styles.bottomInfo}>Apadrinhamento | Ajuda</Button> */}
      </Card>
    );
  } else {
    return null;
  }
};

export default function Chats({navigation}) {
  const {user} = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  const loadData = async () => {
    const request = await getChats(user.uid);
    const data = await request.docs;
    setChats(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {chats.map((destinatario) => (
        <View key={destinatario.id}>
          <ChatItem navigation={navigation} conversa={{...destinatario.data(), id: destinatario.id}} />
        </View>
      ))}
    </View>
  );
}
