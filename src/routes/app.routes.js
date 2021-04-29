/* eslint-disable prettier/prettier */
import React from 'react';

import PetRegister from '../pages/PetRegister';
import Menu from '../pages/Menu/index';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {Container} from '../styles/container';
import MeusPets from '../pages/MeusPets';
import Adotar from '../pages/Adotar';
import Pet from '../pages/Pet';
import RemoverPet from '../pages/RemoverPet';
import Interessados from '../pages/Interessados';
import PetAdotado from '../pages/PetAdotado';
import Notificacoes from '../pages/Notificacoes';
import Chat from '../pages/Chat';
import Chats from '../pages/Chats';

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

function AdotarPetScreen({route, navigation}) {
  console.log('AdotarPetScreen');
  return (
    <SafeAreaView>
      <Container>
        <PetAdotado route={route} navigation={navigation} />
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

function InteressadosScreen({navigation, route}) {
  return (
    <SafeAreaView>
      <Container>
        <Interessados navigation={navigation} route={route}/>
      </Container>
    </SafeAreaView>
  );
}

function NotificacoesScreen({navigation}) {
  return (
    <SafeAreaView>
      <Container>
        <Notificacoes navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function ChatScreen({navigation, route}) {
  return (
    <SafeAreaView>
      <Container>
        <Chat navigation={navigation} route={route} />
      </Container>
    </SafeAreaView>
  );
}

function ChatsScreen({navigation}) {
  return (
    <SafeAreaView>
      <Container>
        <Chats navigation={navigation} />
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
      <AppStack.Screen name="Interessados" component={InteressadosScreen} />
      <AppStack.Screen name="CadastroPet" component={PetRegisterScreen} />
      <AppStack.Screen name="Adotar" component={AdotarScreen} />
      <AppStack.Screen name="Remover pet" component={RemoverPetScreen} />
      <AppStack.Screen name="Adotar pet" component={AdotarPetScreen} />
      <AppStack.Screen name="Notificacoes" component={NotificacoesScreen} />
      <AppStack.Screen name="Chat" component={ChatScreen} />
      <AppStack.Screen name="Chats" component={ChatsScreen} />
    </AppStack.Navigator>
  );
}
