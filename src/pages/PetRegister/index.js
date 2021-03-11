import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {CheckBoxField, RadioButtonField} from '../../components/Button';

export default function PetRegister() {
  const [temperamentos, setTemperamentos] = useState({
    brincalhão: false,
    tímido: false,
    calmo: false,
    guarda: false,
    amoroso: false,
    preguiçoso: false,
  });
  const [saude, setSaude] = useState({
    vacinado: false,
    vermifugado: false,
    castrado: false,
    doente: false,
  });
  const exigencias = useState({
    'termo de adoção': false,
    'fotos da casa': false,
    'visita prévia ao animal': false,
    'acompanhamento pós adoção': false,
  });

  const [especie, setEspecie] = useState('Cachorro');

  return (
    <View>
      <CheckBoxField
        options={temperamentos}
        setOptions={setTemperamentos}
        title="Temperamento"
      />
      <RadioButtonField
        selected={especie}
        setSelected={setEspecie}
        options={['Gato', 'Cachorro']}
        title="Espécie"
      />
    </View>
  );
}
