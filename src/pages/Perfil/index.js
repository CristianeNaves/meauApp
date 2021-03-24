import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

import * from '../../services/user';

export default function Perfil({navigation}) {
  const {register} = useContext(AuthContext);

  return (
    <View>
      <Label label="Informações pessoais" />

      <Label label="Nome completo" />

      <Label label="Idade" />

      <Label label="Email" />

      <Label label="Estado" />

      <Label label="Cidade" />

      <Label label="Endereço" />

      <Label label="Telefone" />

      <Label label="Informações de Perfil" />

      <Label label="Nome de Usuário" />

      <Label label="Senha" />

      <Label label="Confirmação de Senha" />

      <LargeButton
        title="Editar Perfil"
        onPress={() => navigation.navigate('EditarPerfil')}
      />
      
    </View>
  );
}
