import React, {useState} from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

export default function Oops( {navigation} ) {

    return (
        <View>
            <Label label="Ops..."></Label>
            <Label label="Você não pode realizar esta ação sem possuir um cadastro."></Label>
            <LargeButton title="Fazer Cadastro" onPress={() => navigation.navigate('Cadastro')} />
            <Label label="Já possui um cadastro?"></Label>
            <LargeButton title="Fazer Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

