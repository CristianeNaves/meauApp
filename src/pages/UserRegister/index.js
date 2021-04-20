import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AuthContext from '../../contexts/auth';
import {TextInputField} from '../../components/Field';
import {LargeButton} from '../../components/Button';
import {Label} from '../../components/Label';
import ImageSelection from '../../components/ImageSelection';
import storage from '@react-native-firebase/storage';

export default function UserRegister({navigation}) {
  const {register} = useContext(AuthContext);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();

  const [loginName, setLoginName] = useState();
  const [password, setPassword] = useState();
  const [senhaconf, setSenhaConf] = useState();

  const [usrPhoto, setUsrPhoto] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);


  const uploadImage = async () => {
    console.log(usrPhoto);
    const { uri } = usrPhoto;
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

  return (
    <View>
      <Label label="Informações pessoais" />

      <TextInputField
        placeholder="Nome completo"
        // label="Informações pessoais"
        onChange={(value) => setName(value)}
      />

      <TextInputField placeholder="Idade" onChange={(value) => setAge(value)} />

      <TextInputField
        placeholder="Email"
        onChange={(value) => setEmail(value)}
      />

      <TextInputField
        placeholder="Estado"
        onChange={(value) => setState(value)}
      />

      <TextInputField
        placeholder="Cidade"
        onChange={(value) => setCity(value)}
      />

      <TextInputField
        placeholder="Endereço"
        onChange={(value) => setAddress(value)}
      />

      <TextInputField
        placeholder="Telefone"
        onChange={(value) => setTelephone(value)}
      />

      <Label label="Informações de Perfil" />

      <TextInputField
        placeholder="Nome de Usuário"
        // label="Informações de Perfil"
        onChange={(value) => setLoginName(value)}
      />

      <TextInputField
        placeholder="Senha"
        onChange={(value) => setPassword(value)}
      />

      <TextInputField
        placeholder="Confirmação de Senha"
        onChange={(value) => setSenhaConf(value)}
      />

      <ImageSelection image={usrPhoto} onImagePicked={setUsrPhoto}/>

      <LargeButton
        title="Fazer Cadastro"
        onPress={() => {
          const photoFile = usrPhoto.uri.split('/').pop();
          uploadImage();
          register(email, password, {
            name,
            age,
            loginName,
            city,
            telephone,
            address,
            state,
            photoFile,
          });
          }
        }
      />
    </View>
  );
}
