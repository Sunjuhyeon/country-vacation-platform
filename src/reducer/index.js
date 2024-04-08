import {combineReducers} from 'redux';
import dataReducer from './dataReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  map: mapReducer,
});

export default rootReducer;