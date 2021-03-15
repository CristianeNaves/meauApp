import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container} from './styles/container';
import PetRegister from './pages/PetRegister';
import Login from './pages/Login';

export default function App() {
  return (
    <SafeAreaView>
      <Container>
        <Login />
      </Container>
    </SafeAreaView>
  );
}
