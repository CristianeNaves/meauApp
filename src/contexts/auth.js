import React, {createContext, useState} from 'react';
import * as auth from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function logIn(email, password) {
    const user = await auth.logIn(email, password);
    setUser(user); //buscar o user do firestore
  }

  async function logOut() {
    auth.logOut().then(() => {
      setUser(null);
    });
  }

  async function register(email, password, other_info) {
    const user = await auth.register(email, password, other_info);
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, logIn, logOut, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
