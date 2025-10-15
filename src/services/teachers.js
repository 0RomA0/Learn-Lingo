import { database } from '../api/firebase';
import { get, ref, child } from 'firebase/database';

export const getTeachers = async () => {
  try {
    const dbRef = ref(database);
    const getData = await get(child(dbRef, 'teachers'));

    if (getData.exists) {
      const data = getData.val();

      const teachersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return teachersArray;
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};
