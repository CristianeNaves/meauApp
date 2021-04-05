import firestore from '@react-native-firebase/firestore';

const get = async (petId) => {
  try {
    const pet = await firestore().collection('Pets').doc(petId).get();
    return pet; //verificar como está retornando
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

/*
function getAll(userId) {
    return db.collection('Pets').get().then(docs => {

    })
      (doc) => {
        if (doc.exists) return doc.data().text;
        return Promise.reject("No such document");
    });
}
*/

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

export {getAll, create, update, remove};
