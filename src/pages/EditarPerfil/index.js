/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {LargeButton} from '../../components/Button';
import {Input} from 'react-native-elements';
import {Label} from '../../components/Label';

import { update } from '../../services/user';
import { Alert } from 'react-native';

export default function EditarPerfil({navigation}) {
  const {user} = useContext(AuthContext);

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [address, setAddress] = useState(user.address);
  const [telephone, setTelephone] = useState(user.telephone);

  const [loginName, setLoginName] = useState(user.loginName);

  return (
    <View>
      <Label label="Informações pessoais" color="#88c9bf" />

      <Input
        placeholder="Nome Completo"
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <Input
        placeholder="Idade"
        value={age}
        onChangeText={(value) => setAge(value)}
      />

      <Input
        placeholder="Estado"
        value={state}
        onChangeText={(value) => setState(value)}
      />

      <Input
        placeholder="Cidade"
        value={city}
        onChangeText={(value) => setCity(value)}
      />

      <Input
        placeholder="Endereço"
        value={address}
        onChangeText={(value) => setAddress(value)}
      />

      <Input
        placeholder="Telefone"
        value={telephone}
        onChangeText={(value) => setTelephone(value)}
      />

      <Label label="Informações de Perfil" color="#88c9bf" />

      <Input
        placeholder="Nome de Usuário"
        value={loginName}
        onChangeText={(value) => setLoginName(value)}
      />

      <LargeButton
        title="Confirmar"
        color="#88c9bf"
        onPress={() => {
          const newUser = {
                    address: address,
                    age: age,
                    city: city,
                    email: user.email,
                    loginName: loginName,
                    name: name,
                    photoFile: user.photoFile,
                    state: state,
                    telephone: telephone,
                    uid: user.uid,
                  };
          update(user.uid, newUser).then((retorno) =>{
            Alert.alert('Usuário atualizado');
            console.log(retorno);
        });
      }}
      />
    </View>
  );
}
