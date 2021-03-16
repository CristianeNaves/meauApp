import React from 'react';

import Inicial from '../pages/Inicial';
import Oops from '../pages/Oops';
import Login from '../pages/Login';
import UserRegister from '../pages/UserRegister';

import { createStackNavigator } from '@react-navigation/stack';
import { Container } from '../styles/container';
import { SafeAreaView } from 'react-native';

function AuthScreen() {
    return (
      <SafeAreaView>
        <Container>
          <Inicial />
          {/* <Oops /> */}
          {/* <UserRegister /> */}
        </Container>
      </SafeAreaView>
    );
  }

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Titulo Auth" component={AuthScreen} />
        </AuthStack.Navigator>
    );
}