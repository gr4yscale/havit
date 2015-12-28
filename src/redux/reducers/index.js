import { combineReducers } from 'redux';
import soundcloudReducer from './soundcloudReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  soundcloud: soundcloudReducer,
  auth: authReducer,
});

export default rootReducer;
