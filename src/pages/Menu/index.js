/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {Button} from 'react-native-elements';

export default function Menu( {navigation} ) {
  const { signed } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);


  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Meu Perfil"
          onPress={() => navigation.navigate('Perfil')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Meus Pets"
          onPress={() => navigation.navigate('MeusPets')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Cadastrar Animal"
          onPress={() => navigation.navigate('CadastroPet')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Adotar"
          onPress={() => navigation.navigate('Adotar')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Notificações"
          onPress={() => navigation.navigate('Notificacoes')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular', textTransform: 'uppercase'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          title="Chats"
          onPress={() => navigation.navigate('Chats')}
        />
      </View>
      <View style={{marginTop: 44, marginBottom: 68}}>
        <Button
          title="logout"
          type="clear"
          titleStyle={{color: '#88c9bf', fontSize: 16}}
          onPress={() => logOut()}
        />
      </View>

    </View>
  );
}

