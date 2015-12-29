import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger'
import createEngine from 'redux-storage/engines/reactNativeAsyncStorage'
import rootReducer from './reducers'

// setup persistence middleware
const reducer = storage.reducer(rootReducer)
const engine = createEngine('havit-save-key')
const persistence = storage.createMiddleware(engine)

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, promise, persistence, logger)(createStore)

const store = createStoreWithMiddleware(reducer)
const load = storage.createLoader(engine)

// load persisted state back into store
load(store)
    .then(console.log('Loaded previous state'))
    .catch(() => console.log('Failed to load previous state'))

export default store;
