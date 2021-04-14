import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {LeftedContainer} from '../../styles/container';
import {
  CheckBoxField,
  RadioButtonField,
  TextInputField,
} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import AuthContext from '../../contexts/auth';
import {create} from '../../services/pet';

import ImageSelection from '../../components/ImageSelection';
import storage from '@react-native-firebase/storage';

const PetCreated = ({navigation}) => {
  return (
    <View>
      <Text>Eba!</Text>
      <Text>O cadastro do seu pet foi realizado com sucesso!</Text>
      <Text>
        Certifique-se que permitiu o envio de notificações por push no campo
        privacidade do menu configurações do aplicativo. Assim, poderemos te
        assim que alguém interessado entrar em contato!
      </Text>
      <LargeButton
        title="Meus Pets"
        onPress={() => navigation.navigate('MeusPets')}
      />
    </View>
  );
};

const PetForm = ({user, setCreated}) => {
  /** buscar as informaçoes caso esteja fazendo update. Fazer um models para organizar */
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

  const uploadImage = async () => {
    console.log(petPhoto);
    const { uri } = petPhoto;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!'
    // );
    // setImage(null);
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

      <ImageSelection image={petPhoto} onImagePicked={setPetPhoto}/>

      <LargeButton title="Colocar para adoção" onPress={() => createPet()} />
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
