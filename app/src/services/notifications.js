import firestore from '@react-native-firebase/firestore';

const adoptionIntentionNotification = (pet, receiver, sender) => {
  const notification = {
    pet,
    receiver,
    sender,
    type: 'adoptionIntention',
  };

  create(notification);
};

const adoptionConfirmNotification = (pet, receiver, sender) => {
  const notification = {
    pet: pet.id,
    receiver: receiver.id,
    sender: sender.uid,
    type: 'confirmNotification',
  };

  create(notification);
};

const adoptionNegationNotification = (pet, receiver, sender) => {
  const notification = {
    pet: pet.id,
    receiver: receiver.id,
    sender: sender.uid,
    type: 'negationNotification',
  };

  create(notification);
};

const chatNotification = (receiver, sender) => {
  const notification = {
    receiver: receiver,
    sender: sender,
    type: 'chatNotification',
  };

  create(notification);
};

const getAll = async (userId) => {
  const notifications = await firestore()
    .collection('Notifications')
    .where('receiver', '==', userId)
    .get();
  return notifications;
};

const create = async (newNotification) => {
  try {
    const response = await firestore()
      .collection('Notifications')
      .add(newNotification);
    console.log('Notificação criada');
    return response;
  } catch (error) {
    //return error or status
    console.log(error);
    return false;
  }
};

const remove = async (notificationId) => {
  console.log(notificationId);
  try {
    const response = await firestore()
      .collection('Notifications')
      .doc(notificationId)
      .delete();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAll,
  create,
  remove,
  adoptionIntentionNotification,
  adoptionConfirmNotification,
  adoptionNegationNotification,
  chatNotification,
};
