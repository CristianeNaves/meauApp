import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

export default function UserRegister({navigation}) {
  const {register} = useContext(AuthContext);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();

  const [loginName, setLoginName] = useState();
  const [password, setPassword] = useState();
  const [senhaconf, setSenhaConf] = useState();

  return (
    <View>
      <Label label="Informações pessoais" />

      <TextInputField
        placeholder="Nome completo"
        // label="Informações pessoais"
        onChange={(value) => setName(value)}
      />

      <TextInputField placeholder="Idade" onChange={(value) => setAge(value)} />

      <TextInputField
        placeholder="Email"
        onChange={(value) => setEmail(value)}
      />

      <TextInputField
        placeholder="Estado"
        onChange={(value) => setState(value)}
      />

      <TextInputField
        placeholder="Cidade"
        onChange={(value) => setCity(value)}
      />

      <TextInputField
        placeholder="Endereço"
        onChange={(value) => setAddress(value)}
      />

      <TextInputField
        placeholder="Telefone"
        onChange={(value) => setTelephone(value)}
      />

      <Label label="Informações de Perfil" />

      <TextInputField
        placeholder="Nome de Usuário"
        // label="Informações de Perfil"
        onChange={(value) => setLoginName(value)}
      />

      <TextInputField
        placeholder="Senha"
        onChange={(value) => setPassword(value)}
      />

      <TextInputField
        placeholder="Confirmação de Senha"
        onChange={(value) => setSenhaConf(value)}
      />

      <LargeButton
        title="Fazer Cadastro"
        onPress={() =>
          register(email, password, {
            name,
            age,
            loginName,
            city,
            telephone,
            address,
            state,
          })
        }
      />
    </View>
  );
}
