import { combineReducers } from 'redux';
import auth from './authReducer'
import server from './serverReducer'
import share from './shareReducer'

const rootReducer = combineReducers({
  auth,
  entities: server,
});

function reducer(state = {}, action) {
  return {
    auth: auth(state, action),
    entities: server(state, action),
    share: share(state, action),
  }
}

export default rootReducer;
// export default reducer;
