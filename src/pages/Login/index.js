import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';
import {Input} from 'react-native-elements';
import {LargeButton} from '../../components/Button';
import styles from '../../components/Image/styles';

export default function Login({navigation}) {
  const [user, setUser] = useState({});
  const {logIn} = useContext(AuthContext);

  return (
    <View>
      <View style={{marginTop: 64}} />
      <Input
        placeholder="E-mail do usuário"
        onChangeText={(email) => setUser({...user, email})}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setUser({...user, password})}
      />

      <View style={{marginTop: 52}}>
        <LargeButton
          title="Entrar"
          onPress={() => logIn(user.email, user.password)}
          color="#88c9bf"
        />
      </View>
    </View>
  );
}
