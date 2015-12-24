import { combineReducers } from 'redux';
import comments from './comments';
// import authReducer from './authReducer';

const rootReducer = combineReducers({
  comments,
  // authReducer
});

export default rootReducer;
