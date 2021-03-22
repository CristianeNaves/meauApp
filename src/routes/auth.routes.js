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
    return (
      <SafeAreaView>
        <Container>
          <Inicial navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function OopsScreen({ navigation }) {
    return (
      <SafeAreaView>
        <Container>
          <Oops navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function LoginScreen({ navigation }) {
    return (
      <SafeAreaView>
        <Container>
          <Login navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
}

function UsrRegisterScreen({ navigation }) {
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
            <AuthStack.Screen name="Inicial" component={InicialScreen} />
            <AuthStack.Screen name="Oops" component={OopsScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Cadastro" component={UsrRegisterScreen} />
        </AuthStack.Navigator>
    );
}