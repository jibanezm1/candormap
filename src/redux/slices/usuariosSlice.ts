import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  error: null,
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, addUser, loginUser, logoutUser, updateUserProfile } = usuariosSlice.actions;

export default usuariosSlice.reducer;
