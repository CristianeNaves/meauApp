/* eslint-disable prettier/prettier */
import React from 'react';

import Inicial from '../pages/Inicial';
import Oops from '../pages/Oops';
import Login from '../pages/Login';
import UserRegister from '../pages/UserRegister';

import { createStackNavigator } from '@react-navigation/stack';
import { Container } from '../styles/container';
import { SafeAreaView } from 'react-native';

function InicialScreen({ navigation }) {
  console.log("InicialScreen");
    return (
      <SafeAreaView>
        <Container>
          <Inicial navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function OopsScreen({ navigation }) {
  console.log("OopsScreen");
    return (
      <SafeAreaView>
        <Container>
          <Oops navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function LoginScreen({ navigation }) {
  console.log("LoginScreen");
    return (
      <SafeAreaView>
        <Container>
          <Login navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function UsrRegisterScreen({ navigation }) {
  console.log("UsrRegScreen");
    return (
      <SafeAreaView>
        <Container>
          <UserRegister navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}



const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Inicial" component={InicialScreen} options={{headerStyle: {backgroundColor: '#fee29b'}, headerTitleStyle: {color: '#434343'}}} />
            <AuthStack.Screen name="Oops" component={OopsScreen} options={{headerStyle: {backgroundColor: '#cfe9e5'}, headerTitleStyle: {color: '#434343'}}} />
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerStyle: {backgroundColor: '#cfe9e5'}, headerTitleStyle: {color: '#434343'}}} />
            <AuthStack.Screen name="Cadastro" component={UsrRegisterScreen} options={{headerStyle: {backgroundColor: '#cfe9e5'}, headerTitleStyle: {color: '#434343'}}} />
        </AuthStack.Navigator>
    );
}