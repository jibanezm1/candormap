// src/redux/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slices/rootReducer';


export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
