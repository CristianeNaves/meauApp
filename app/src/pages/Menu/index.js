/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';
import {Button} from 'react-native-elements';
import {LargeButton} from '../../components/Button';

export default function Menu( {navigation} ) {
  const { logOut } = useContext(AuthContext);
  const styles = StyleSheet.create({
    margin: {marginTop: 20},
    buttonClear: {marginTop: 44, marginBottom: 68},
    buttonTitle: {color: '#88c9bf', fontSize: 16, fontFamily: 'Roboto-Regular'},
  });


  return (
    <View>
      <View style={styles.margin}>
        <LargeButton
          title="Meu Perfil"
          onPress={() => navigation.navigate('Perfil')}
          color="#88c9bf"
        />
      </View>

      <View style={styles.margin}>
        <LargeButton
          title="Meus Pets"
          color="#88c9bf"
          onPress={() => navigation.navigate('MeusPets')}
        />
      </View>

      <View style={styles.margin}>
        <LargeButton
          title="Cadastrar Pet"
          color="#88c9bf"
          onPress={() => navigation.navigate('CadastroPet')}
        />
      </View>

      <View style={styles.margin}>
        <LargeButton
          title="Adotar"
          color="#88c9bf"
          onPress={() => navigation.navigate('Adotar')}
        />
      </View>

      <View style={styles.margin}>
        <LargeButton
          title="Notificações"
          color="#88c9bf"
          onPress={() => navigation.navigate('Notificações')}
        />
      </View>

      <View style={styles.margin}>
        <LargeButton
          title="Chats"
          color="#88c9bf"
          onPress={() => navigation.navigate('Chats')}
        />
      </View>

      <View style={styles.buttonClear}>
        <Button
          title="logout"
          type="clear"
          titleStyle={styles.buttonTitle}
          onPress={() => logOut()}
        />
      </View>

    </View>
  );
}

