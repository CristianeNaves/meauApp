import React from 'react';

import PetRegister from '../pages/PetRegister';

import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { Container } from '../styles/container';

function PetRegisterScreen({ navigation }) {
    return (
      <SafeAreaView>
        <Container>
          <PetRegister navigation={navigation} />
        </Container>
      </SafeAreaView>
    );
  }

const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        <AppStack.Navigator>
            <AppStack.Screen name="CadastroPet" component={PetRegisterScreen} />
        </AppStack.Navigator>
    );
}
