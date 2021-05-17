/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {View, Alert} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Button} from 'react-native-elements';

import styles from './styles';
import { LargeImage } from '../Image';

export default function ImageSelection({photo, onImagePicked}){
  const [image, setImage] = useState({uri: ""});
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    if (photo) {
      console.log("useEffect: " + photo);
      //setSelectedImage({ uri: photo });
    }
  }, [photo]);

  const selectImage = () => {
    console.log("selectImage");
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    console.log("antes do showImagePicker");
    // ImagePicker.showImagePicker(options, response => {
    launchImageLibrary({title:"Escolha uma foto"}, response => {
      console.log("showimagepicker");
      if (response.didCancel) { console.log('User cancelled image picker');
      } else if (response.error) { console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) { console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
        onImagePicked(source);
      }
    });
  };

  const uploadImage = async () => {
    console.log(image);
    const { uri } = image;
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
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };

  return (
    <View>
      {image.uri ? (
        <View style={{alignItems: 'center'}}>
          <LargeImage source={image.uri} />
        </View>
      ) : null}
      <View style={{alignItems: 'center', marginBottom: 20, marginTop: 16}}>
        <Button
          titleStyle={{color: '#757575', fontFamily: 'Roboto Regular'}}
          buttonStyle={{width: 312, height: 60, backgroundColor: '#e1e2e2'}}
          title="adicionar foto"
          onPress={selectImage}
        />
      </View>
      {/* <SmallButton title="Upload foto" onPress={uploadImage} /> */}
    </View>
  );

}
