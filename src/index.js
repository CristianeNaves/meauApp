import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
