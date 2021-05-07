/* eslint-disable prettier/prettier */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './style';
import AuthContext from '../../contexts/auth';
import {remove, sentAdoptionIntention} from '../../services/pet';
import {getChat, update} from '../../services/chat';
import {get} from '../../services/user';
import {SmallImage} from '../../components/Image';

import storage from '@react-native-firebase/storage';
import SimpleChat from "react-native-simple-chat";

import {chatNotification} from '../../services/notifications';

const arr = [
  {
    senderFlag: true,
    text: 'Carregando',
  },
  {
    senderFlag: false,
    text: 'chat...',
  },
];

export default function Chat({navigation, route}) {
  const {user} = useContext(AuthContext);
  const OCHAT = route.params ? route.params : {};
  const destinatario = OCHAT ? ((OCHAT.users[0] == user.uid)?OCHAT.users[1]:OCHAT.users[0]) : {};

  const mensagensTam = 0;

  const [chat, setChat] = useState();
  const [chatID, setChatID] = useState();
  
  const [messages, setMessages] = React.useState();
  const [chatPhoto, setChatPhoto] = useState({
    uri:
      'https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png',
  });


  // Tratamento de mensagens vindas do banco
  const configMessages = (msgs) => {
    mensagensTam = msgs.length;
    if (!messages) 
      return msgs;
    msgs.forEach(ms => {
      // ms['text'] = ms.message;
      // delete ms.message;
      console.log("sender: "+ms.sender);
      ms['senderFlag'] = (ms.sender === user.uid) ? true : false;
      // delete ms.sender;
    });
    // console.log(msgs);
    return msgs;
  };

  // Carrega foto do destinatário
  const loadPhoto = async () => {
    try {
      const image = storage().ref().child(destinatario.photoFile);
      image.getDownloadURL().then((url) => {
        setChatPhoto({ uri: url });
      })
      .catch(error => {
        console.log('Não foi possível resgatar foto do destinatario.');
      });
    } catch (error) {
      console.log('Não foi possível resgatar foto do destinatario.');
    }
  };

  // Carrega o chat vindo do banco de dados
  const loadData = async () => {
    setChat(OCHAT);
    // console.log("chat: "+chat);
    setMessages(configMessages(OCHAT.messages));
    // getChat(user.uid, destinatario.id).then((retorno) => {
    //   console.log('getChat() retorno: ', retorno);
    //   // const data = await retorno.docs[0]._data.messages;
    //   setChat(retorno);
    //   console.log(chat);
    //   setMessages(configMessages(retorno.messages));
    // });
  };

  useEffect(() => {
    loadPhoto();
    loadData();
  }, []);

  // setInterval(function(){
  //   getChat(OCHAT.users[0], OCHAT.users[1]).then((response) => {
  //     console.log(response);
  //   }); 

  //   // console.log("atualizei o chat");
  // }, 2000);

  const sendMessage = (newMessage) => {
    const newMessageObj = { senderFlag: true, text: newMessage };
    setMessages([...messages, newMessageObj]);

    chat.messages.push({sender: user.uid, text: newMessage});
    update(chat.id, chat);

    //enviar notificação
    chatNotification(destinatario.id, user.uid);
  };

  return (
    <View>
      <View>
        <SmallImage source={chatPhoto.uri} /> 
        <Text>{destinatario.name}</Text> 
      </View>
      {messages ? (<SimpleChat
        data={messages}
        sendButtonText="Enviar"
        onPressSendButton={sendMessage}
      />) : null}
    </View>
  );
  
}
