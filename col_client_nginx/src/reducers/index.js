import { combineReducers } from 'redux';
import dataReducer from './reducer_data';
import dataReducerJess from './reducer_data_jess';
import resutlsReducer from './reducer_results';
import randomReducer from './reducer_random';

const rootReducer = combineReducers({
  data: dataReducer,
  dataJess: dataReducerJess,
  results: resutlsReducer,
  random: randomReducer
});

export default rootReducer;
