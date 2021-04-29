/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {LargeButton} from '../../components/Button';
import AuthContext from '../../contexts/auth';

export default function Menu( {navigation} ) {
  const { signed } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);


  return (
    <View>
      <LargeButton title="Meu Perfil" onPress={() => navigation.navigate('Perfil')} />
      <LargeButton title="Meus Animais" onPress={() => navigation.navigate('MeusPets')} />

      <LargeButton title="Cadastrar Animal" onPress={() => navigation.navigate('CadastroPet')} />
      <LargeButton title="Adotar" onPress={() => navigation.navigate('Adotar')} />

      <LargeButton title="Notificações" onPress={() => navigation.navigate('Notificacoes')}/>
      <LargeButton title="Chats" onPress={() => navigation.navigate('Chats')}/>

      <LargeButton title="Logout" onPress={() => logOut()} />
    </View>
  );
}

