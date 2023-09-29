import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  misiones: [], // Aquí almacenamos la lista de misiones
};

const misionesSlice = createSlice({
  name: 'misiones',
  initialState,
  reducers: {
    setMisiones: (state, action) => {
      state.misiones = action.payload;
    },
    addMision: (state, action) => {
      state.misiones.push(action.payload);
    },
  },
});

export const { setMisiones, addMision } = misionesSlice.actions;

export default misionesSlice.reducer;
