import React, {useState} from 'react';
import {View} from 'react-native';
import {LargeButton} from '../../components/Button';
import styles from '../../components/Button/styles';
import {TextInputField} from '../../components/Field';

export default function Login() {
  const [user, setUser] = useState({});
  return (
    <View>
      <TextInputField
        placeholder="Nome de usuário"
        onChange={(name) => setUser({...user, name})}
      />
      <TextInputField
        placeholder="Senha"
        onChange={(password) => setUser({...user, password})}
      />
      <LargeButton title="Entrar" style={styles.blueButton} />
      <LargeButton title="Entrar com facebook" style={styles.facebookButton} />
      <LargeButton title="Entrar com google" style={styles.gmailButton} />
    </View>
  );
}
