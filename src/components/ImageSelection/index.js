import React, { useState, useEffect } from 'react'
import {View, Image, Alert, SafeAreaView, TouchableOpacity, Text} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { SmallButton } from '../Button';

import styles from './styles';
import { LargeImage } from '../Image';

export default function ImageSelection({photo, onImagePicked}){
  const [image, setImage] = useState({uri: ""});
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    if (photo) {
      console.log("useEffect: " + photo);
      setSelectedImage({ uri: photo });
    }
  }, [photo])

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
      {/* <Image source="" /> */}
      {image !== null ? (
          // <Image style={styles.imageBox} source={ image }  />
          <LargeImage source={image.uri} />
         ) : null}
      <SmallButton title="Escolher foto" onPress={selectImage} />
      {/* <SmallButton title="Upload foto" onPress={uploadImage} /> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
