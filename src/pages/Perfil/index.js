/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';

import {Text} from 'react-native-elements';
import {LargeImage} from '../../components/Image';
import {Label} from '../../components/Label';
import {LargeButton} from '../../components/Button';
import storage from '@react-native-firebase/storage';

export default function Perfil({navigation}) {
  const {user} = useContext(AuthContext);
  const [usrPhoto, setUsrPhoto] = useState({uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzizgQQjWDQqcRkOdd6_VEOXmlrg5Rr0bxPg&usqp=CAU'});
  const styles = StyleSheet.create({
    button: {marginTop: 32, marginBottom: 24},
    title: {alignItems: 'center', marginTop: 36, marginBottom: 8},
    image: {alignItems: 'center'},
    textStyle: {color: '#757575', fontSize: 14, textAlign: 'center', fontFamily: 'Roboto-Regular'},
  });

  try {
    const image = storage().ref().child(user.photoFile);
    image.getDownloadURL().then((url) => {
      setUsrPhoto({ uri: url });
    })
    .catch(error => {
      console.log('Não foi possível resgatar foto de usuário.');
    });
  } catch (error) {
    console.log('Não foi possível resgatar foto de usuário.');
  }

  return (
    <View>
      <View style={styles.image}>
        <LargeImage source={usrPhoto.uri} />
      </View>

      <View style={styles.title}>
        <Label color="#589b9b" label="Nome Completo" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.name}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Idade" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.age}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Email" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.email}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Localização" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.city} - {user.state}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Endereço" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.address}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Telefone" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.telephone}{' '}
      </Text>

      <View style={styles.title}>
        <Label color="#589b9b" label="Nome de Usuário" />
      </View>
      <Text style={styles.textStyle}>
        {' '}
        {user.loginName}{' '}
      </Text>

      <View style={styles.button}>
        <LargeButton
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditarPerfil')}
          color="#88c9bf"
        />
      </View>
    </View>
  );
}
