import firestore from '@react-native-firebase/firestore';

const get = async (userId) => {
  try {
    const user = await firestore().collection('users').doc(userId).get();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (userId) => {
  let users = null;
  try {
    if (userId) {
      users = await firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();
    } else {
      users = await firestore().collection('users').get();
    }
    return users;
  } catch (error) {
    console.log(error);
  }
};

const create = async (newUser) => {
  //criar um user para um user id
  try {
    const response = await firestore().collection('users').add(newUser);
    console.log('User cadastrado');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (userId, newUser) => {
  try {
    const response = await firestore()
      .collection('users')
      .doc(userId)
      .update(newUser);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (userId) => {
  try {
    const response = await firestore().collection('users').doc(userId).delete();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getInteressados = async (pet) => {
  if (pet.intentios.length <= 0) {
    return [];
  }
  const interessados = await firestore()
    .collection('users')
    // .where('name', '==', "testonildo2")
    .where(firestore.FieldPath.documentId(), 'in', pet.intentios)
    .get();
  return interessados;
};

export {get, getAll, create, update, remove, getInteressados};
