import React from 'react-native'
import { Provider } from 'react-redux/native'
import store from './redux/store'
import { loadInitialData } from './redux/store'
import App from './containers/app'
import {Actions} from '../node_modules/react-native-router-flux'
import _ from 'lodash' // TOFIX: hrmmmm... not sure about having this one in...
import * as serverActions from './redux/actions/serverActions'
import * as shareActions from './redux/actions/shareActions'

const {
  DeviceEventEmitter,
} = React

// This is necessary because React Components will not have mounted (and thus Router) when we receive the
// event from the Android Native Module. So, I set some state on the redux store and when the components
// are ready they can use that to route to the appropriate component (ShareContainer). TOFIX

DeviceEventEmitter.addListener(
  'IntentReceived',
  (url) => {
    store.dispatch(shareActions.androidIntentReceieved({url}))
  }
)

class Root extends React.Component {

  constructor(props) {
    super(props)

    this.lastIntentUrlReceived = store.getState().share.lastIntentUrlReceived
    if (this.lastIntentUrlReceived) {
      setTimeout(() => loadInitialData(), 1000)
    } else {
      loadInitialData()
    }
  }

  // TOFIX: do this on LOAD action of redux-store, this is logic that should be in the actions not component
  loadInitialData() {
    loadInitialData((newState) => {
      if (_.get(newState, 'auth.currentUser')) {
        // TOFIX: don't do this when sharing to load faster
        store.dispatch(serverActions.fetchLinksReceived())
      } else {
        // TOFIX: Actions may not have all of the routes by this point (race condition)
        Actions.Authenticate()
      }
    })
  }

  render () {
    return (
      <Provider store={store}>
        {() => <App lastIntentUrlReceived={this.lastIntentUrlReceived} />}
      </Provider>
    )
  }
}

export default Root
