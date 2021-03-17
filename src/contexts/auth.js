import React, {createContext, useState} from 'react';
import * as auth from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function logIn(email, password) {
    const response = await auth.logIn(email, password);
    setUser(response.user);
  }

  async function logOut() {
    auth.logOut().then(() => {
      setUser(null);
    });
  }

  async function register(email, password) {
    const response = await auth.register(email, password);
    console.log(response);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, logIn, logOut, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
