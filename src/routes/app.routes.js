import React from 'react';

import PetRegister from '../pages/PetRegister';
import Menu from '../pages/Menu';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {Container} from '../styles/container';

function MenuScreen({navigation}) {
  console.log("MenuScreen");
  return (
    <SafeAreaView>
      <Container>
        <Menu navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function MeuPerfilScreen({navigation}) {
  console.log("MeuPerfilScreen");
  return (
    <SafeAreaView>
      <Container>
        <Perfil navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function EditarPerfilScreen({navigation}) {
  console.log("EditarPerfilScreen");
  return (
    <SafeAreaView>
      <Container>
        <EditarPerfil navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function MeusPetsScreen({navigation}) {
  console.log("MeusPetsScreen");
  return (
    <SafeAreaView>
      <Container>
        {/* <PetRegister navigation={navigation} /> */}
      </Container>
    </SafeAreaView>
  );
}

function PetRegisterScreen({navigation}) {
  console.log("PetRegisterScreen");
  return (
    <SafeAreaView>
      <Container>
        <PetRegister navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
}

function AdotarScreen({navigation}) {
  console.log("AdotarScreen");
  return (
    <SafeAreaView>
      <Container>
        {/* <PetRegister navigation={navigation} /> */}
      </Container>
    </SafeAreaView>
  );
}



const AppStack = createStackNavigator();

export default function AppRoutes(){
  return(
    <AppStack.Navigator>
      <AppStack.Screen name="Menu" component={MenuScreen} />
      <AppStack.Screen name="Perfil" component={MeuPerfilScreen} />
      <AppStack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <AppStack.Screen name="MeusPets" component={MeusPetsScreen } />
      <AppStack.Screen name="CadastroPet" component={PetRegisterScreen} />
      <AppStack.Screen name="Adotar" component={AdotarScreen} />
    </AppStack.Navigator>
  );
}
