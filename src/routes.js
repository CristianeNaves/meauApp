import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container} from './styles/container';
import PetRegister from './pages/PetRegister';
import Login from './pages/Login';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

export default function Routes() {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(AuthContext);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView>
      <Container>{user ? <PetRegister /> : <Login />}</Container>
    </SafeAreaView>
  );
}
