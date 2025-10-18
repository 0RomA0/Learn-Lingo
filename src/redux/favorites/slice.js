import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      if (state.items.includes(payload)) {
        state.items = state.items.filter((id) => id !== payload);
      } else {
        state.items.push(payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
