/* eslint-disable prettier/prettier */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './style';
import AuthContext from '../../contexts/auth';
import {remove, sentAdoptionIntention} from '../../services/pet';
import {getChat} from '../../services/chat';
import {get} from '../../services/user';
import {SmallImage} from '../../components/Image';

import storage from '@react-native-firebase/storage';
import SimpleChat from "react-native-simple-chat";

import {chatNotification} from '../../services/notifications';

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

export default function Chat({navigation, route}) {
  const {user} = useContext(AuthContext);
  const [chat, setChat] = useState();
  const [chatID, setChatID] = useState();
  const destinatario = route.params ? route.params : {};
  console.log('dest: ', destinatario);
  const [messages, setMessages] = React.useState();
  const [chatPhoto, setChatPhoto] = useState({
    uri:
      'https://i.pinimg.com/originals/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.png',
  });

  const configMessages = (msgs) => {
    if (!messages) 
      return msgs;
    msgs.forEach(ms => {
      ms['text'] = ms.message;
      delete ms.message;
      ms['senderFlag'] = (ms.sender === user.uid) ? true : false;
      delete ms.sender;
    });
    console.log(msgs);
    return msgs;
  };

  //console.log("Destinatario ID: " + destinatarioID);
  // const colorStyle =
  //   user.uid === pet.userId
  //     ? styles.infoTitleMeusPets
  //     : styles.infoTitleAdoption;

  const loadPhoto = async () => {
    try {
      const image = storage().ref().child(destinatario.photoFile);
      // const image = images.child('image1');
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

  const loadData = async () => {
    const response = await getChat(user.uid, destinatario.id);
    console.log('response: ', response);
    const data = await response.docs[0]._data.messages;
    setChat(data);
    setMessages(configMessages(data));

  };

  useEffect(() => {
    loadPhoto();
    loadData();
  }, []);

  /*
  useEffect(() => {
    let isCancelled = false;
    console.log("uid: ", user.uid);
    console.log("dest id: ", destinatario);
    // ----------- GET CHAT --------------
    getChat(user.uid, destinatario.id).then((response) => {
      console.log("GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT GETCHAT ");
      // response.forEach((chat) => {
        // setChat((oldChat) => [...oldChat, {...chat.data(), id: chat.id}]);
        setChat("chat: "+chat.data());
        setChatID("chat id: "+chat.id);
        console.log(chat.data());
        // });
        
        setTimeout(function(){
          console.log(chat);
          // setChat(response.data());
          setMessages(chat.messages);
          
          messages.forEach(mensagem => {
            mensagem.senderFlag = (mensagem.sender == user.uid) ? true : false;
          });
          console.log("MENSAGENS: ");
          console.log(messages);}, 1000);
        });
        return () => {
          isCancelled = true;
          return (
            <Text>Erro procurando chats</Text>
            );
          };
  }, []);
  */

  const sendMessage = (newMessage) => {
    const newMessageObj = { senderFlag: true, text: newMessage };
    setMessages([...messages, newMessageObj]);
    //enviar notificação
    chatNotification(destinatario.id, user);
  };

  if (chat){
    console.log('messages: ', messages);
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
  } else {
    return null;
  }
  
}
