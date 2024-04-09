import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../reducer/mapReducer';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
