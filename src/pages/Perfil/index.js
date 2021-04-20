import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';

import {Text, Image} from 'react-native-elements';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {LargeImage} from '../../components/Image';
import {Label} from '../../components/Label';

import { get } from '../../services/user';

import storage from '@react-native-firebase/storage';

import styles from './style';

export default function Perfil({navigation}) {
  const {register} = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  const [usrPhoto, setUsrPhoto] = useState({uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU"});

  try {
    const image = storage().ref().child(user.photoFile);
    // const image = images.child('image1');
    image.getDownloadURL().then((url) => { 
      setUsrPhoto({ uri: url })
      // console.log(usrPhoto);
    })
    .catch(error => {
      console.log("Não foi possível resgatar foto de usuário.");
    });
  } catch (error) {
    console.log("Não foi possível resgatar foto de usuário.");
  }

  return (
    <View>
      <Label label="Informações pessoais" />
        <LargeImage source={ usrPhoto.uri } />
      <Label label="Nome completo" />
        <Text> {user.name} </Text>
      <Label label="Idade" />
        <Text> {user.age} </Text>
      <Label label="Email" />
        <Text> {user.email} </Text>
      <Label label="Localização" />
        <Text> {user.city} - {user.state} </Text>
      <Label label="Endereço" />
        <Text> {user.address} </Text>
      <Label label="Telefone" />
        <Text> {user.telephone} </Text>
      <Label label="Informações de Perfil" />

      <Label label="Nome de Usuário" />
        <Text> {user.loginName} </Text>
      <Label label="Histórico" />


      <LargeButton
        title="Editar Perfil"
        onPress={() => navigation.navigate('EditarPerfil')}
      />
      
    </View>
  );
}
