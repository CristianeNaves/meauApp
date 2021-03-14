import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView>
    <NavigationContainer>
      {/* <View>
        <Text>Hello</Text>
      </View> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
