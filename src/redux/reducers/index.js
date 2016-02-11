import { combineReducers } from 'redux';
import auth from './authReducer'
import server from './serverReducer'
import share from './shareReducer'
import app from './appReducer'
import accountSettings from './accountSettingsReducer'

export default combineReducers({
  accountSettings,
  app,
  auth,
  entities: server,
  share,
})
