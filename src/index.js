import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import AuthContext, {AuthProvider} from './contexts/auth';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
