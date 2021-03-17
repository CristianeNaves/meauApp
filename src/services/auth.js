import auth from '@react-native-firebase/auth';

export async function logIn(email, password) {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response;
  } catch (error) {
    console.warn(error);
  }
}

export async function logOut() {
  try {
    await auth().signOut();
  } catch (error) {
    console.warn(error);
  }
}

export async function register(email, password) {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.warn(error);
  }
}
