import React from 'react';

import PetRegister from '../pages/PetRegister';

import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { Container } from '../styles/container';

function AppScreen() {
    return (
      <SafeAreaView>
        <Container>
          <PetRegister />
        </Container>
      </SafeAreaView>
    );
  }

const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        <AppStack.Navigator>
            <AppStack.Screen name="Titulo App" component={AppScreen} />
        </AppStack.Navigator>
    );
}
