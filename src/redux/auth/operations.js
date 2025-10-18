import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../api/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logInUser = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user || null);
        });
      });

      return user
        ? { uid: user.uid, email: user.email, name: user.displayName || 'User' }
        : { uid: null, email: null, name: null };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
