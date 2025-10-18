import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInUser, logOutUser, refreshUser } from './operations';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    loading: false,
    error: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedIn = true;
      } else {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.pending, handlePending)
      .addCase(logInUser.rejected, handleRejected)
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logOutUser.pending, handlePending)
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = !!action.payload.uid;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = { uid: null, name: null, email: null };
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export default usersSlice.reducer;
