import { combineReducers } from 'redux';
import dataReducer from './reducer_data';
import dataReducerJess from './reducer_data_jess';
import resutlsReducer from './reducer_results';

const rootReducer = combineReducers({
  data: dataReducer,
  dataJess: dataReducerJess,
  results: resutlsReducer
});

export default rootReducer;
