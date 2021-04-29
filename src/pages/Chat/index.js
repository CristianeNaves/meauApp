import React, {useState, useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './style';
import AuthContext from '../../contexts/auth';
import {remove, sentAdoptionIntention} from '../../services/pet';
import {SmallImage} from '../../components/Image';

import storage from '@react-native-firebase/storage';
import SimpleChat from "react-native-simple-chat";

const arr = [
    {
      senderFlag: true,
      text: 'hello',
    },
    {
      senderFlag: false,
      text: 'teste',
    },
  ];


export default function Chat({route, navigation}) {
  const [chat, setChat] = useState(route.params ? route.params : {});
  const [messages, setMessages] = React.useState(arr);
  const {user} = useContext(AuthContext);

//   const colorStyle =
//     user.uid === pet.userId
//       ? styles.infoTitleMeusPets
//       : styles.infoTitleAdoption;

  const [chatPhoto, setChatPhoto] = useState({
    uri:
      'https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png',
  });

  try {
    const image = storage().ref().child(user.photoFile);
    // const image = images.child('image1');
    image
      .getDownloadURL()
      .then((url) => {
        setChatPhoto({uri: url});
      })
      .catch(() => {
        console.log('Não foi possível resgatar foto do remetente.');
      });
  } catch (error) {
    console.log('Não foi possível resgatar foto do remetente.');
  }

  const sendMessage = (newMessage) => {
    const newMessageObj = { senderFlag: true, text: newMessage };
    setMessages([...messages, newMessageObj]);
  };

  return (
    <View>
      <View>
        <SmallImage source={chatPhoto.uri} />

      </View>

      <SimpleChat
        data={messages}
        sendButtonText="Enviar"
        onPressSendButton={sendMessage}
      />
      
    </View>
  );
}
