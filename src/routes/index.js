/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AuthContext from '../contexts/auth';

export default function Routes() {
    const {signed} = useContext(AuthContext);
    return (signed ? <AppRoutes /> : <AuthRoutes />);
}
