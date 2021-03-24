import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

export default function EditarPerfil({navigation}) {
  const {register} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();

  const [loginName, setLoginName] = useState();

  return (
    <View>
      <Label label="Informações pessoais" />

      <TextInputField
        placeholder={user.name}
        // label="Informações pessoais"
        onChange={(value) => setName(value)}
      />

      <TextInputField 
        placeholder={user.age}
        onChange={(value) => setAge(value)} 
      />

      <TextInputField
        placeholder={user.state}
        onChange={(value) => setState(value)}
      />

      <TextInputField
        placeholder={user.city}
        onChange={(value) => setCity(value)}
      />

      <TextInputField
        placeholder={user.address}
        onChange={(value) => setAddress(value)}
      />

      <TextInputField
        placeholder={user.telephone}
        onChange={(value) => setTelephone(value)}
      />

      <Label label="Informações de Perfil" />

      <TextInputField
        placeholder={user.loginName}
        onChange={(value) => setLoginName(value)}
      />

      <LargeButton
        title="Confirmar"
        onPress={() => navigation.navigate('Perfil')}
      />
      
    </View>
  );
}
