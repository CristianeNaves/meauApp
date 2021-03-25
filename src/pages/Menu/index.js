import React, {useState, useContext} from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';
import AuthContext from '../../contexts/auth';

export default function Menu( {navigation} ) {
    const { signed } = useContext(AuthContext);
    const { logOut } = useContext(AuthContext);


    return (
        <View>
            <LargeButton title="Meu Perfil" onPress={() => navigation.navigate('Perfil')} />
            <LargeButton title="Meus Animais" onPress={() => navigation.navigate('MeusPets')} />
            
            <LargeButton title="Cadastrar Animal" onPress={() => navigation.navigate('CadastroPet')} />
            <LargeButton title="Adotar" onPress={() => navigation.navigate('Adotar')} />

            <LargeButton title="Logout" onPress={() => logOut()} />
        </View>
    );
}

