import { combineReducers } from 'redux';
import dataReducer from './reducer_data';
import resutlsReducer from './reducer_results';

const rootReducer = combineReducers({
  data: dataReducer,
  results: resutlsReducer
});

export default rootReducer;
