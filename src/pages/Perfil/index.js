import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';

import {Text} from 'react-native-elements';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

import { get } from '../../services/user';

export default function Perfil({navigation}) {
  const {register} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  return (
    <View>
      <Label label="Informações pessoais" />

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
