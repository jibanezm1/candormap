import { combineReducers } from '@reduxjs/toolkit';
import usuariosReducer from './usuariosSlice';
import misionesReducer from './misionesSlice';
import cuestionariosReducer from './cuestionariosSlice';

const rootReducer = combineReducers({
  usuarios: usuariosReducer,
  misiones: misionesReducer,
  cuestionarios: cuestionariosReducer,
});

export default rootReducer;
