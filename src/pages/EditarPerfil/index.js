import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {TextInputField} from '../../components/Field';
import {Label} from '../../components/Label';
import {Button} from 'react-native-elements';
import {update} from '../../services/user';

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
      <Label color="#589b9b" label="Informações pessoais" />

      <TextInputField
        placeholder="Nome completo"
        value={name}
        // label="Informações pessoais"
        onChange={(value) => setName(value)}
      />

      <TextInputField 
        placeholder="Idade"
        value={age}
        onChange={(value) => setAge(value)} 
      />

      <TextInputField
        placeholder="Estado"
        value={state}
        onChange={(value) => setState(value)}
      />

      <TextInputField
        placeholder="Cidade"
        value={city}
        onChange={(value) => setCity(value)}
      />

      <TextInputField
        placeholder="Endereço"
        value={address}
        onChange={(value) => setAddress(value)}
      />

      <TextInputField
        placeholder="Telefone"
        value={telephone}
        onChange={(value) => setTelephone(value)}
      />

      <Label color="#589b9b" label="Informações de perfil" />

      <TextInputField
        placeholder="Nome de Usuário"
        value={loginName}
        onChange={(value) => setLoginName(value)}
      />

      <View style={{display: 'flex', alignItems: 'center', marginTop: 32, marginBottom: 24}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          onPress={() => update(user.uid, user)}
          title="CONFIRMAR"
        />
      </View>

    </View>
  );
}
