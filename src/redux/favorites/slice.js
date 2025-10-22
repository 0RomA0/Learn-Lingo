import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    byUser: {},
  },
  reducers: {
    toggleFavorite: (state, { payload: { uid, teacherId } }) => {
      const items = state.byUser[uid]?.items || [];
      const updatedItems = items.includes(teacherId)
        ? items.filter((id) => id !== teacherId)
        : [...items, teacherId];

      state.byUser = {
        ...state.byUser,
        [uid]: { items: updatedItems },
      };
    },
    resetFavoritesData: (state, { payload: uid }) => {
      state.byUser = {
        ...state.byUser,
        [uid]: { items: [] },
      };
    },
  },
});

export const { toggleFavorite, resetFavoritesData } = favoritesSlice.actions;
export default favoritesSlice.reducer;
