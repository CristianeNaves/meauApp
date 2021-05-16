import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';

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
      <View style={{marginTop: 52}} />
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Button
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf'}}
          onPress={() => logIn(user.email, user.password)}
          title="ENTRAR"
        />
      </View>
    </View>
  );
}
