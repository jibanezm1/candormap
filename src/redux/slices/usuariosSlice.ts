import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null, // Aquí almacenaremos los detalles del usuario actualmente logeado
  error: null, // Aquí almacenaremos información sobre errores de inicio de sesión
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
      state.error = null; // Limpia el error si el inicio de sesión fue exitoso
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null; // Limpia el error al cerrar sesión
    },
  },
});

export const { setUsers, addUser, loginUser, logoutUser } = usuariosSlice.actions;

export default usuariosSlice.reducer;
