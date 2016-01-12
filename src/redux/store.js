import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import { decorators } from 'redux-storage'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger'
import createEngine from 'redux-storage/engines/reactNativeAsyncStorage'
import rootReducer from './reducers'
import {Actions} from '../../node_modules/react-native-router-flux'


// setup persistence middleware

const reducer = storage.reducer(rootReducer)
let engine = createEngine('havit-save-key')
engine = decorators.filter(engine, ['auth', ['entities', 'friends'], ['entities', 'links']]) // TOFIX: make sure persisting friends doesn't bite me in the ass later with cache invalidation issues!
// engine = decorators.filter(engine, [['entities', 'friends'], ['entities', 'links']]) // TOFIX: make sure persisting friends doesn't bite me in the ass later with cache invalidation issues!
engine = decorators.debounce(engine, 1500)

const persistence = storage.createMiddleware(engine)

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, promise, persistence, logger)(createStore)

const store = createStoreWithMiddleware(reducer)
const load = storage.createLoader(engine)

// load persisted state back into store

export function loadInitialData(callback) {
  load(store)
      .then((newState) => {
        console.log('Loaded previous auth state')
        callback(newState)
        return Promise.resolve()
      })
      .catch((err) => console.log('Failed to load previous auth state', err))
}

export default store;
