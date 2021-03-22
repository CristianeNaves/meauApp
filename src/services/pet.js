import firestore from '@react-native-firebase/firestore';

const getAll = () => {
  //buscar todos os pets de um id
};

const create = async (userId, newPet) => {
  //criar um pet para um user id
  try {
    const response = await firestore()
      .collection('Pets')
      .add({...newPet, userId});
    console.log('Pet cadastrado');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = (pet_id, newPet) => {
  //fazer o update de um pet dado o id dele
};

const remove = () => {
  //remover o pet
};

export {getAll, create, update, remove};
