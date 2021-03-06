/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';

const get = async (chatId) => {
  try {
    const user = await firestore().collection('chats').doc(chatId).get();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (chatId) => {
  let chats = null;
  try {
    if (chatId) {
      chats = await firestore()
        .collection('chats')
        .where('chatId', '==', chatId)
        .get();
    } else {
      chats = await firestore().collection('chats').get();
    }
    return chats;
  } catch (error) {
    console.log(error);
  }
};

const newChat = (userA, userB) => {
  const novochat = {
    messages: [],
    users: [userA, userB],
  };

  create(novochat);
};

const create = async (newChat) => {
  //criar um user para um user id
  try {
    const response = await firestore().collection('chats').add(newChat);
    console.log('Chat criado');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (chatId, newChat) => {
  try {
    const response = await firestore()
      .collection('chats')
      .doc(chatId)
      .update(newChat);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (chatId) => {
  try {
    const response = await firestore().collection('chats').doc(chatId).delete();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (userA, userB) => {
  // console.log('userA: ', userA);
  // console.log('userB: ', userB);
  let chat = await firestore()
    .collection('chats')
    //.where(userA, 'in', 'users')
    //.where(userB, 'in', 'users')
    .where('users', 'array-contains-any', [userA, userB])
    .get();

  let oChat;
  chat.forEach(c => {
    const conv = c._data;
    if( ((conv.users[0] == userA) && (conv.users[1] == userB)) || ((conv.users[1] == userA) && (conv.users[0] == userB)) ){
      oChat = c._data;
    }
  })
  return oChat;
  
};

const getChats = async (user) => {
  const chat = await firestore()
    .collection('chats')
    .where('users', 'array-contains', user)
    .get();
  return chat;
};

export {get, getAll, create, update, remove, getChat, getChats, newChat};
