import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../api/firebase';
import {
  get,
  query,
  ref,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async ({ limit = 4, startAfterKey = null } = {}, thunkAPI) => {
    try {
      const teachersRef = ref(database, 'teachers');
      let teachersQuery;

      if (!startAfterKey) {
        teachersQuery = query(teachersRef, orderByKey(), limitToFirst(limit));
      } else {
        teachersQuery = query(
          teachersRef,
          orderByKey(),
          startAfter(startAfterKey),
          limitToFirst(limit),
        );
      }

      const snapshot = await get(teachersQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        return teachersArray;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
