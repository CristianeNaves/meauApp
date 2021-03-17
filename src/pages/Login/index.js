import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {LargeButton} from '../../components/Button';
import styles from '../../components/Button/styles';
import {TextInputField} from '../../components/Field';
import AuthContext from '../../contexts/auth';

export default function Login() {
  const [user, setUser] = useState({});
  const {logIn} = useContext(AuthContext);

  return (
    <View>
      <TextInputField
        placeholder="Email de usuário"
        onChange={(email) => setUser({...user, email})}
      />
      <TextInputField
        placeholder="Senha"
        onChange={(password) => setUser({...user, password})}
      />
      <LargeButton
        title="Entrar"
        style={styles.blueButton}
        onPress={() => logIn(user.email, user.password)}
      />
      <LargeButton title="Entrar com facebook" style={styles.facebookButton} />
      <LargeButton title="Entrar com google" style={styles.gmailButton} />
    </View>
  );
}
