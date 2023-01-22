import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function logIn(email, password) {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return getUserDocument(response.user.uid);
  } catch (error) {
    console.log(error);
  }
}

export async function logOut() {
  try {
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
}

export async function register(email, password, other_info) {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return generateUserDocument(response.user, other_info);
  } catch (error) {
    console.log(error);
  }
}

export async function generateUserDocument(user, other_info) {
  if (!user) return;

  const {email} = user;

  const ref = firestore().collection('users');
  const firestore_user = await ref.doc(user.uid).get();

  if (!firestore_user.exists) {
    try {
      await ref.doc(user.uid).set({
        email,
        ...other_info,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return getUserDocument(user.uid);
}

const getUserDocument = async (uid) => {
  if (!uid) return;
  try {
    const userDocument = await firestore().collection('users').doc(uid).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.log(error);
  }
};
