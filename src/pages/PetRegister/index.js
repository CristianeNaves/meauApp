import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {
  CheckBoxField,
  RadioButtonField,
  TextInputField,
} from '../../components/Field';
import {LargeButton} from '../../components/Button';

export default function PetRegister( {navigation} ) {
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
  const [exigencias, setExigencias] = useState({
    'termo de adoção': false,
    'fotos da casa': false,
    'visita prévia ao animal': false,
    'acompanhamento pós adoção': false,
  });
  const [mes, setMes] = useState({
    '1 mês': false,
    '3 meses': false,
    '6 meses': false,
  });

  const [petName, setPetName] = useState();
  const [deoncas, setDoencas] = useState();
  const [sobre, setSobre] = useState();

  const [especie, setEspecie] = useState('Gato');
  const [sexo, setSexo] = useState('Macho');
  const [porte, setPorte] = useState('Pequeno');
  const [idade, setIdade] = useState('Filhote');
  return (
    <View>
      <TextInputField
        placeholder="Nome do animal"
        label="Nome do animal"
        onChange={(value) => setPetName(value)}
      />
      <RadioButtonField
        selected={especie}
        setSelected={setEspecie}
        options={['Gato', 'Cachorro']}
        title="Espécie"
      />
      <RadioButtonField
        selected={sexo}
        setSelected={setSexo}
        options={['Macho', 'Fêmea']}
        title="Sexo"
      />
      <RadioButtonField
        selected={porte}
        setSelected={setPorte}
        options={['Pequeno', 'Médio', 'Grande']}
        title="Porte"
      />
      <RadioButtonField
        selected={idade}
        setSelected={setIdade}
        options={['Filhote', 'Adulto', 'Idoso']}
        title="Idade"
      />
      <CheckBoxField
        options={temperamentos}
        setOptions={setTemperamentos}
        title="Temperamento"
      />
      <CheckBoxField options={saude} setOptions={setSaude} title="Saúde" />
      <TextInputField
        placeholder="Doenças do animal"
        onChange={(value) => setDoencas(value)}
      />
      <CheckBoxField
        options={exigencias}
        setOptions={setExigencias}
        title="Exigências"
        horizontal={true}
      />
      <LeftedContainer>
        <CheckBoxField
          options={mes}
          setOptions={setMes}
          bright={true}
          horizontal={true}
        />
      </LeftedContainer>
      <TextInputField
        onChange={(value) => setSobre(value)}
        label="Sobre o animal"
        placeholder="Compartilhe a história do animal"
      />
      <LargeButton title="Colocar para adoção" />
    </View>
  );
}
