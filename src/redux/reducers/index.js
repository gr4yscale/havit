import { combineReducers } from 'redux';
import soundcloudReducer from './soundcloudReducer'
import authReducer from './authReducer'
import serverReducer from './serverReducer'

const rootReducer = combineReducers({
  soundcloud: soundcloudReducer,
  auth: authReducer,
  entities: serverReducer,
});

export default rootReducer;
