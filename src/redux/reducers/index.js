import { combineReducers } from 'redux';
import auth from './authReducer'
import server from './serverReducer'
import share from './shareReducer'
import app from './appReducer'

export default combineReducers({
  app,
  auth,
  entities: server,
  share,
})
