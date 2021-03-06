/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {getInteressados} from '../../services/user';
import {Button, Card} from 'react-native-paper';
import styles from './style';

import storage from '@react-native-firebase/storage';
import { update } from '../../services/pet';
import { Alert } from 'react-native';

import {adoptionConfirmNotification, adoptionNegationNotification} from '../../services/notifications';
import { getChat, newChat } from '../../services/chat';

const InteressadoItem = ({navigation, interessado, pet, user}) => {

  const [interessadoPhoto, setInteressadoPhoto] = useState({uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU'});
  const [chats, setChats] = useState([]);
  let chatVazio = true;

  const loadPhoto = async () => {
    try {
      const image = storage().ref().child(interessado.photoFile);
      // const image = images.child('image1');
      image.getDownloadURL().then((url) => {
        setInteressadoPhoto({ uri: url });
      })
      .catch(error => {
        console.log('Não foi possível resgatar foto do interessado.');
      });
    } catch (error) {
      console.log('Não foi possível resgatar foto do interessado.');
    }
  };

  const loadData = async () => {
    const request = await getChat(user.uid, interessado.id);
    const data = await request.docs;
    data.forEach((chat) => {
      if (chat.data()) {
        chatVazio = false;
      }
    });
    console.log('data: ', data);
    setChats(data);
  };

  useEffect(() => {
    loadPhoto();
    //loadData();
  }, []);

  return (
    <Card
      style={{marginBottom: 12}}
      onPress={async () => {
            let chatInteressado = await getChat(user.uid, interessado.id);
            if (!chatInteressado){
              newChat(user.uid, interessado.id);
            }
            chatInteressado = await getChat(user.uid, interessado.id);
            navigation.navigate('Chat', chatInteressado);
          }
        }
      >
      <Card.Title
        title={interessado.name}
        style={{backgroundColor: '#cfe9e5'}}
        titleStyle={styles.titleInfo}
      />
      <Card.Cover source={{uri: interessadoPhoto.uri}} />
      <Button labelStyle={styles.bottomInfo} onPress={() => {
        var texto = `Permitir que ${interessado.name} adote ${pet.petName} ?`;
        Alert.alert(
          "Confirmar adoção?",
          texto,
          [
            {
              text: "Cancelar",
              onPress: () => {},
            },
            { text: "Ok", onPress: () => {
              // navigation.navigate('Perfil', interessado);
              pet.intentios = null;
              pet.userId = interessado.id;
              update(pet.id, pet).then((response) => {
                navigation.navigate('Adotar pet', {name: pet.petName});
                adoptionConfirmNotification(pet, interessado, user);
              });
            } }
          ]
        );
      }}>Confirmar adoção</Button>

      <Button labelStyle={styles.bottomInfo} onPress={() => {
        var texto = `Excluir a solicitação de ${interessado.name} ?`;
        Alert.alert(
          "Excluir solicitação?",
          texto,
          [
            {
              text: "Cancelar",
              onPress: () => {},
            },
            { text: "Ok", onPress: () => {
              // navigation.navigate('Perfil', interessado);
              pet.intentios.pop(interessado.id);
              update(pet.id, pet).then((response) => {
                navigation.navigate('Interessados', pet);
                adoptionNegationNotification(pet, interessado, user);
              });
            } }
          ]
        );
      }}>Remover solicitação</Button>
      {/* <Button labelStyle={styles.bottomInfo}>Apadrinhamento | Ajuda</Button> */}
    </Card>
  );
};

export default function Interessados({navigation, route}) {
  const {user} = useContext(AuthContext);
  const [interessados, setInteressados] = useState([]);

  const loadData = async () => {
    const response = await getInteressados(route.params);
    const data = await response.docs;
    setInteressados(data);
  };

  useEffect(() => {
    loadData();
    /*
    let isCancelled = false;
    getInteressados(route.params).then((intentions) => {
      intentions.forEach((interessado) => {
        if (!isCancelled) {
          setInteressados((oldInteressados) => [...oldInteressados, {...interessado.data(), id: interessado.id}]);
        }
      });

    });
    return () => {
      isCancelled = true;
    };*/
  }, []);
  console.log(interessados[0]);
  return (
    <View>
      {interessados.map((interessado) => (
        <View key={interessado.id}>
          <InteressadoItem navigation={navigation} interessado={{...interessado.data(), id: interessado.id}} pet={route.params} user={user} />
        </View>
      ))}
    </View>
  );
}
