/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';
import { Button } from 'react-native-elements';

export default function Oops({navigation}) {
  return (
    <View>
      <Text
        style={{
          fontSize: 53,
          fontFamily: 'Courgette Regular',
          color: '#88c9bf',
          marginBottom: 52,
          marginTop: 52,
          textAlign: 'center'
        }}>
        Ops...
      </Text>
      <Text style={{
        color: '#757575', 
        fontSize: 14, 
        textAlign: 'center', 
        fontFamily: 'Roboto Regular',
        marginBottom: 16
        }}>
        Você não pode realizar esta ação sem possuir um cadastro.
      </Text>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Button
          title="FAZER CADASTRO"
          onPress={() => navigation.navigate('Cadastro')}
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf', marginBottom: 44}}
        />
      </View>
      <Text style={{
        color: '#757575', 
        fontSize: 14, 
        textAlign: 'center', 
        fontFamily: 'Roboto Regular',
        marginBottom: 16
        }}>
        Já possui um cadastro?
      </Text>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Button
          title="FAZER LOGIN"
          onPress={() => navigation.navigate('Login')}
          titleStyle={{color: '#434343', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 232, height: 50, backgroundColor: '#88c9bf', marginBottom: 44}}
        />
      </View>
    </View>
  );
}
