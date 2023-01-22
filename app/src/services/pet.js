import firestore from '@react-native-firebase/firestore';
import {adoptionIntentionNotification} from '../services/notifications';

const get = async (petId) => {
  try {
    const pet = await firestore().collection('Pets').doc(petId).get();
    return pet;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (userId) => {
  const pets = await firestore()
    .collection('Pets')
    .where('userId', '==', userId)
    .get();
  return pets;
};

const getPetsForAdoption = async (userId) => {
  const pets = await firestore()
    .collection('Pets')
    .where('userId', '!=', userId)
    .get();
  return pets;
};

const getPetLocalization = async (userId) => {
  const user = await firestore().collection('users').doc(userId).get();
  return user.data();
};

const sentAdoptionIntention = (pet, sender) => {
  const path = `Pets/${pet.id}`;
  firestore()
    .doc(path)
    .update({
      intentios: firestore.FieldValue.arrayUnion(sender.uid),
    })
    .then(() => {
      console.log('adicionada intenção de adotar');
      adoptionIntentionNotification(pet.id, pet.userId, sender.uid);
    });
};

const create = async (newPet, userId) => {
  //criar um pet para um user id
  try {
    const response = await firestore()
      .collection('Pets')
      .add({...newPet, userId});
    console.log('Pet cadastrado');
    return response;
  } catch (error) {
    //return error or status
    console.log(error);
    return false;
  }
};

const update = async (petId, newPet) => {
  try {
    const response = await firestore()
      .collection('Pets')
      .doc(petId)
      .update(newPet);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (petId) => {
  try {
    const response = await firestore().collection('Pets').doc(petId).delete();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  get,
  getAll,
  create,
  update,
  remove,
  getPetsForAdoption,
  getPetLocalization,
  sentAdoptionIntention,
};
