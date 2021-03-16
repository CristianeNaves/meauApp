import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {
  CheckBoxField,
  RadioButtonField,
  TextInputField,
} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

export default function UserRegister() {
  const [name, setName] = useState();
  const [idade, setIdade] = useState();
  const [email, setEmail] = useState();
  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [endereco, setEndereco] = useState();
  const [telefone, setTelefone] = useState();

  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [senhaconf, setSenhaConf] = useState();

  
  return (
    <View>
      <Label label="Informações pessoais"></Label>

      <TextInputField
        placeholder="Nome completo"
        // label="Informações pessoais"
        onChange={(value) => setName(value)}
      />
      
      <TextInputField
        placeholder="Idade"
        onChange={(value) => setIdade(value)}
      />
      
      <TextInputField
        placeholder="Email"
        onChange={(value) => setEmail(value)}
      />

      <TextInputField
        placeholder="Estado"
        onChange={(value) => setEstado(value)}
      />

      <TextInputField
        placeholder="Cidade"
        onChange={(value) => setCidade(value)}
      />

      <TextInputField
        placeholder="Endereço"
        onChange={(value) => setEndereco(value)}
      />

      <TextInputField
        placeholder="Telefone"
        onChange={(value) => setTelefone(value)}
      />

      <Label label="Informações de Perfil"></Label>

      <TextInputField
        placeholder="Nome de Usuário"
        // label="Informações de Perfil"
        onChange={(value) => setUsuario(value)}
      />

      <TextInputField
        placeholder="Senha"
        onChange={(value) => setSenha(value)}
      />

      <TextInputField
        placeholder="Confirmação de Senha"
        onChange={(value) => setSenhaConf(value)}
      />


      <LargeButton title="Fazer Cadastro" />
    </View>
  );
}
