import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const config = {
    user,
    setUser,
    login: async (email, password) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.warn(error);
      }
    },
    register: async (email, password) => {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        console.warn(error);
      }
    },
    logout: async () => {
      try {
        await auth().signOut();
      } catch (error) {
        console.warn(error);
      }
    },
  };

  return <AuthContext.Provider value={config}>{children}</AuthContext.Provider>;
};
