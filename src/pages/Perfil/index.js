import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';

import {Text} from 'react-native-elements';
import {LargeImage} from '../../components/Image';
import {Label} from '../../components/Label';

import storage from '@react-native-firebase/storage';
import {Button} from 'react-native-elements';

export default function Perfil({navigation}) {
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
      <View style={{alignItems: 'center'}}>
        <LargeImage source={usrPhoto.uri} />
      </View>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Nome Completo" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.name}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Idade" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.age}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Email" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.email}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Localização" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.city} - {user.state}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Endereço" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.address}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Telefone" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.telephone}{' '}
      </Text>

      <View style={{alignItems: 'center', marginTop: 36, marginBottom: 8}}>
        <Label color="#589b9b" label="Nome de Usuário" />
      </View>
      <Text style={{color: '#757575', fontSize: 14, textAlign: 'center'}}>
        {' '}
        {user.loginName}{' '}
      </Text>

      <View style={{display: 'flex', alignItems: 'center', marginTop: 32, marginBottom: 24}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          onPress={() => navigation.navigate('EditarPerfil')}
          title="EDITAR PERFIL"
        />
      </View>
    </View>
  );
}
