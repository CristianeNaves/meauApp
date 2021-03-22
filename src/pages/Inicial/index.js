import React, {useState, useContext} from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';
import { mockLogin } from '../../services/auth';
import AuthContext from '../../contexts/auth';

export default function Inicial( {navigation} ) {
    const { signed } = useContext(AuthContext);

    async function handleSignIn() {
        const response = await mockLogin();
        console.log(response);
    }

    return (
        <View>
            <Label label="Olá!"></Label>
            <Label label="Bem-vindo ao Meau!"></Label>
            <Label label="Aqui você pode adotar e doar cães e gatos com facilidade."></Label>
            <Label label="Qual o seu interesse?"></Label>
            <LargeButton title="Adotar" onPress={() => navigation.navigate('Oops')} />
            <LargeButton title="Cadastrar Animal" onPress={() => navigation.navigate('Oops')} />
            <LargeButton title="Fazer Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

