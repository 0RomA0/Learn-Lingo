import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAPVlm8ZmSjkbOx6tnz5Bt6mfig__i3mjw',
  authDomain: 'learn-lingo-69582.firebaseapp.com',
  projectId: 'learn-lingo-69582',
  storageBucket: 'learn-lingo-69582.firebasestorage.app',
  messagingSenderId: '973563218545',
  appId: '1:973563218545:web:5250f6e7efc68f4ad569d0',
  measurementId: 'G-W9CSZ47HFX',
  databaseURL: 'https://learn-lingo-69582-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
