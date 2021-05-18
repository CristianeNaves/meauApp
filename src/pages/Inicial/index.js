/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LargeButton} from '../../components/Button';
import {Button, Image} from 'react-native-elements';
import image from '../../assets/Meau_marca_2.png';

export default function Inicial( {navigation} ) {
  const styles = StyleSheet.create({
    h1: {
      fontSize: 72,
      color: '#ffd358',
      textAlign: 'center',
      marginBottom: 52,
      marginTop: 0,
      fontFamily: 'Courgette-Regular',
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      color: '#757575',
      fontFamily: 'Roboto-Regular',
    },
    image: {
      alignItems: 'center',
    },
    imageSize: {
      width: 122,
      height: 44,
    },
    buttonClear: {
      marginTop: 44,
      marginBottom: 68,
    },
    buttonTitle: {
      color: '#88c9bf',
      fontSize: 16,
    },
  });

  return (
    <View>
      <Text
        style={styles.h1}>
        Olá!
      </Text>
      <Text style={styles.text}>Bem-vindo ao Meau!</Text>
      <Text style={styles.text}>Aqui você pode adotar e doar cães e gatos com facilidade.</Text>
      <Text style={styles.text}>Qual o seu interesse?</Text>

      <View style={{marginTop: 48}}>
        <LargeButton
          title="Adotar"
          onPress={() => navigation.navigate('Oops')}
          color="#ffd358"
        />
      </View>
      <View style={{marginTop: 12}}>
        <LargeButton
          title="Cadastrar Animal"
          onPress={() => navigation.navigate('Oops')}
          color="#ffd358"
        />
      </View>

      <View style={styles.buttonClear}>
        <Button
          title="login"
          type="clear"
          titleStyle={styles.buttonTitle}
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <View style={styles.image}>
        <Image
          source={{ uri: Image.resolveAssetSource(image).uri }}
          style={styles.imageSize}
        />
      </View>
    </View>
  );
}

