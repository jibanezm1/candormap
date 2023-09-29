import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cuestionarios: [], // Aquí almacenamos la lista de cuestionarios
};

const cuestionariosSlice = createSlice({
  name: 'cuestionarios',
  initialState,
  reducers: {
    setCuestionarios: (state, action) => {
      state.cuestionarios = action.payload;
    },
    addCuestionario: (state, action) => {
      state.cuestionarios.push(action.payload);
    },
  },
});

export const { setCuestionarios, addCuestionario } = cuestionariosSlice.actions;

export default cuestionariosSlice.reducer;
