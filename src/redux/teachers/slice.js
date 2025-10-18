import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers } from './operations';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastKey: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)
      .addCase(fetchTeachers.rejected, handleRejected)
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;

        const newItems = action.payload.filter(
          (teacher) => !state.items.some((t) => t.id === teacher.id),
        );

        state.items = [...state.items, ...newItems];

        if (newItems.length > 0) {
          state.lastKey = newItems[newItems.length - 1].id;
        }

        state.hasMore = action.payload.length === action.meta.arg.limit;
      });
  },
});

export default teachersSlice.reducer;
