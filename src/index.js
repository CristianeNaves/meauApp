import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container} from './styles/container';
import PetRegister from './pages/PetRegister';

export default function App() {
  return (
    <SafeAreaView>
      <Container>
        <PetRegister />
      </Container>
    </SafeAreaView>
  );
}
