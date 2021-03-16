import React, {useState} from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';

export default function Inicial() {

    return (
        <View>
            <Label label="Olá!"></Label>
            <Label label="Bem-vindo ao Meau!"></Label>
            <Label label="Aqui você pode adotar e doar cães e gatos com facilidade."></Label>
            <Label label="Qual o seu interesse?"></Label>
            <LargeButton title="Adotar" />
            <LargeButton title="Cadastrar Animal" />
            <LargeButton title="Fazer Login" />
        </View>
    );
}

