import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {
  CheckBoxField,
  RadioButtonField,
  TextInputField,
} from '../../components/Field';
import AuthContext from '../../contexts/auth';
import {create} from '../../services/pet';

import ImageSelection from '../../components/ImageSelection';
import storage from '@react-native-firebase/storage';
import {Button} from 'react-native-elements';
import {LargeButton} from '../../components/Button';

const PetCreated = ({navigation}) => {
  const styles = StyleSheet.create({
    h1: {
      textAlign: 'center',
      fontSize: 53,
      color: '#ffd358',
      marginBottom: 52,
      marginTop: 52,
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      color: '#757575',
    },
    button: {
      marginTop: 32,
      marginBottom: 24,
    },
  });

  return (
    <View>
      <Text style={styles.h1}>Eba!</Text>
      <Text style={styles.text}>
        O cadastro do seu pet foi realizado com sucesso!
      </Text>

      <View style={styles.button}>
        <LargeButton
          onPress={() => navigation.navigate('MeusPets')}
          title="confirmar"
          color="#ffd358"
        />
      </View>
    </View>
  );
};

const PetForm = ({user, setCreated}) => {
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
  const [doencas, setDoencas] = useState();
  const [sobre, setSobre] = useState();

  const [especie, setEspecie] = useState('Gato');
  const [sexo, setSexo] = useState('Macho');
  const [porte, setPorte] = useState('Pequeno');
  const [idade, setIdade] = useState('Filhote');

  const [petPhoto, setPetPhoto] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const styles = StyleSheet.create({
    margin: {marginBottom: 24},
    text: {
      fontSize: 12,
      color: '#f7a800',
      textTransform: 'uppercase',
      marginBottom: 16,
    },
  });

  const uploadImage = async () => {
    console.log(petPhoto);
    const {uri} = petPhoto;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
  };

  function createPet() {
    const photoFile = petPhoto.uri.split('/').pop();
    uploadImage();
    const response = create(
      {
        petName,
        doencas,
        sobre,
        especie,
        sexo,
        idade,
        porte,
        saude,
        exigencias,
        mes,
        temperamentos,
        photoFile,
      },
      user.uid,
    );
    if (response) {
      setCreated(true);
    }
  }

  return (
    <View>
      <TextInputField
        placeholder="Nome do animal"
        label="Nome do animal"
        onChange={(value) => setPetName(value)}
      />
      <Text style={styles.text}>Foto do Animal</Text>
      <ImageSelection image={petPhoto} onImagePicked={setPetPhoto} />
      <RadioButtonField
        selected={especie}
        setSelected={setEspecie}
        options={['Gato', 'Cachorro']}
        width={90}
        title="Espécie"
      />
      <RadioButtonField
        selected={sexo}
        setSelected={setSexo}
        options={['Macho', 'Fêmea']}
        width={90}
        title="Sexo"
      />
      <RadioButtonField
        selected={porte}
        setSelected={setPorte}
        options={['Pequeno', 'Médio', 'Grande']}
        width={90}
        title="Porte"
      />
      <RadioButtonField
        selected={idade}
        setSelected={setIdade}
        options={['Filhote', 'Adulto', 'Idoso']}
        width={90}
        title="Idade"
      />
      <CheckBoxField
        options={temperamentos}
        width={82}
        setOptions={setTemperamentos}
        title="Temperamento"
      />
      <CheckBoxField
        options={saude}
        setOptions={setSaude}
        width={90}
        title="Saúde"
      />
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
      <View style={styles.margin}>
        <LargeButton
          color="#ffd358"
          title="colocar para adoção"
          onPress={() => createPet()}
        />
      </View>
    </View>
  );
};

export default function PetRegister({navigation}) {
  const {user} = useContext(AuthContext);
  const [created, setCreated] = useState(false);

  return created ? (
    <PetCreated navigation={navigation} />
  ) : (
    <PetForm user={user} setCreated={setCreated} />
  );
}
