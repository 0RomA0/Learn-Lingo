import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    language: '',
    level: '',
    price: '',
  },

  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    resetFilters: (state) => {
      state.language = '';
      state.level = '';
      state.price = '';
    },
  },
});

export const { setLanguage, setLevel, setPrice, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
