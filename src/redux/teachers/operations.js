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
  async ({ limit = 4, startAfterKey = null, filters = {} } = {}, thunkAPI) => {
    try {
      const teachersRef = ref(database, 'teachers');
      let teachersQuery;

      if (!startAfterKey) {
        teachersQuery = query(teachersRef, orderByKey(), limitToFirst(50));
      } else {
        teachersQuery = query(
          teachersRef,
          orderByKey(),
          startAfter(startAfterKey),
          limitToFirst(50),
        );
      }

      const snapshot = await get(teachersQuery);

      if (!snapshot.exists()) return [];

      const data = snapshot.val();
      let teachersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      if (filters.language) {
        teachersArray = teachersArray.filter((t) =>
          t.languages.includes(filters.language),
        );
      }

      if (filters.level) {
        teachersArray = teachersArray.filter((t) =>
          t.levels.includes(filters.level),
        );
      }

      if (filters.price) {
        teachersArray = teachersArray.filter(
          (t) => t.price_per_hour <= filters.price,
        );
      }

      return teachersArray.slice(0, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
