import { auth } from '../api/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

export const registerUser = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name,
  });

  console.log('User registered:', user);
};

export const logInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOutUser = () => {
  return signOut(auth);
};

export const observeUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
