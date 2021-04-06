/* eslint-disable prettier/prettier */
import React from 'react';

import PetRegister from '../pages/PetRegister';
import Menu from '../pages/Menu/index';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {Container} from '../styles/container';
import MeusPets from '../pages/MeusPets/index';
import Adotar from '../pages/Adotar';
import Pet from '../pages/Pet';
import RemoverPet from '../pages/RemoverPet';

function MenuScreen({navigation}) {
  console.log('MenuScreen');
  return (
    <SafeAreaView>
      <Container>
        <Menu navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function MeuPerfilScreen({navigation}) {
  console.log('MeuPerfilScreen');
  return (
    <SafeAreaView>
      <Container>
        <Perfil navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function EditarPerfilScreen({navigation}) {
  console.log('EditarPerfilScreen');
  return (
    <SafeAreaView>
      <Container>
        <EditarPerfil navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function MeusPetsScreen({navigation}) {
  console.log('MeusPetsScreen');
  return (
    <SafeAreaView>
      <Container>
        <MeusPets navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function PetRegisterScreen({navigation}) {
  console.log('PetRegisterScreen');
  return (
    <SafeAreaView>
      <Container>
        <PetRegister navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function AdotarScreen({navigation}) {
  console.log('AdotarScreen');
  return (
    <SafeAreaView>
      <Container>
        <Adotar navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function RemoverPetScreen({route, navigation}) {
  console.log('RemoverPetScreen');
  return (
    <SafeAreaView>
      <Container>
        <RemoverPet route={route} navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function PetScreen({route, navigation}) {
  return (
    <SafeAreaView>
      <Container>
        <Pet navigation={navigation} route={route}/>
      </Container>
    </SafeAreaView>
  );
}

const AppStack = createStackNavigator();

export default function AppRoutes() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Menu" component={MenuScreen} />
      <AppStack.Screen name="Perfil" component={MeuPerfilScreen} />
      <AppStack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <AppStack.Screen name="MeusPets" component={MeusPetsScreen} />
      <AppStack.Screen name="Pet" component={PetScreen} />
      <AppStack.Screen name="CadastroPet" component={PetRegisterScreen} />
      <AppStack.Screen name="Adotar" component={AdotarScreen} />
      <AppStack.Screen name="Remover pet" component={RemoverPetScreen} />
    </AppStack.Navigator>
  );
}
