/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LargeButton} from '../../components/Button';

export default function Oops({navigation}) {
  const styles = StyleSheet.create({
    h1: {
      fontSize: 53,
      fontFamily: 'Courgette-Regular',
      color: '#88c9bf',
      marginBottom: 52,
      marginTop: 52,
      textAlign: 'center',
    },
    text: {
      color: '#757575',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
      marginBottom: 16,
    },
    margin: {marginBottom: 44},
  });
  return (
    <View>
      <Text
        style={styles.h1}>
        Ops...
      </Text>
      <Text style={styles.text}>
        Você não pode realizar esta ação sem possuir um cadastro.
      </Text>
      <View style={styles.margin}>
        <LargeButton
          title="Fazer Cadastro"
          onPress={() => navigation.navigate('Cadastro')}
          color="#88c9bf"
        />
      </View>
      <Text style={styles.text}>Já possui um cadastro?</Text>
      <View style={styles.margin}>
        <LargeButton
          title="Fazer Login"
          onPress={() => navigation.navigate('Login')}
          color="#88c9bf"
        />
      </View>
    </View>
  );
}
