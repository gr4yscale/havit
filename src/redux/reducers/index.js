import { combineReducers } from 'redux';
import auth from './authReducer'
import server from './serverReducer'
import share from './shareReducer'

const rootReducer = combineReducers({
  auth,
  entities: server,
  share,
})

export default rootReducer;
