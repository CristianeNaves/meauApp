/* eslint-disable prettier/prettier */
import React from 'react';
import PetRegister from '../pages/PetRegister';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {Container} from '../styles/container';
import PetList from '../pages/PetList.js';

function PetRegisterScreen({navigation}) {
  return (
    <SafeAreaView>
      <Container>
        <PetRegister navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function PetListScreen({navigation}) {
  return (
    <SafeAreaView>
      <Container>
        <PetList navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

const AppStack = createStackNavigator();

export default function AppRoutes(){
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Cadastro do Animal" component={PetRegisterScreen} />
      <AppStack.Screen name="Meus Pets" component={PetListScreen} />
    </AppStack.Navigator>
  );
}
