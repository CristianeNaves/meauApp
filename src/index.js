import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container} from './styles/container';
import PetRegister from './pages/PetRegister';
import UserRegister from './pages/UserRegister';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Oops from './pages/Oops';
import Inicial from './pages/Inicial';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Container>
        {/* <PetRegister /> */}
        {/* <UserRegister /> */}
        {/* <Oops /> */}
        <Inicial />
      </Container>
    </SafeAreaView>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View>
        <Text>Hello</Text>
      </View> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
