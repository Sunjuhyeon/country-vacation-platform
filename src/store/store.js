import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../reducer/mapReducer';
import dataReducer from '../reducer/dataReducer'

const store = configureStore({
  reducer: {
    map: mapReducer,
    data: dataReducer,
  },
});

export default store;
