/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {LargeButton} from '../../components/Button';
import {Button, Image} from 'react-native-elements';
import AuthContext from '../../contexts/auth';
import image from '../../assets/Meau_marca_2.png';

export default function Inicial( {navigation} ) {
  const { signed } = useContext(AuthContext);

  return (
    <View>
      <Text
        style={{
          fontSize: 72,
          color: '#ffd358',
          textAlign: 'center',
          marginBottom: 52,
          marginTop: 54,
          fontFamily: 'Courgette-Regular'
        }}>
        Olá!
      </Text>
      <Text style={{textAlign: 'center', fontSize: 16, color: '#757575'}}>Bem-vindo ao Meau!</Text>
      <Text style={{textAlign: 'center', fontSize: 16, color: '#757575'}}>Aqui você pode adotar e doar cães e gatos com facilidade.</Text>
      <Text style={{textAlign: 'center', fontSize: 16, color: '#757575'}}>Qual o seu interesse?</Text>

      <View style={{display: 'flex', alignItems: 'center', marginTop: 48}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#ffd358'}}
          onPress={() => navigation.navigate('Oops')}
          title="ADOTAR"
        />
      </View>

      <View style={{display: 'flex', alignItems: 'center', marginTop: 12}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#ffd358'}}
          onPress={() => navigation.navigate('Oops')}
          title="CADASTRAR ANIMAL"
        />
      </View>
      <View style={{marginTop: 44, marginBottom: 68}}>
        <Button
          title="login"
          type="clear"
          titleStyle={{color: '#88c9bf', fontSize: 16}}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{ uri: Image.resolveAssetSource(image).uri }}
          style={{ width: 122, height: 44}}
        />
      </View>
    </View>
  );
}

