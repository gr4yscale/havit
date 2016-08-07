import React, {Component} from 'react'
import {
  DeviceEventEmitter,
  Platform,
  AppStateIOS,
  // Alert,
} from 'react-native'

import { Provider } from 'react-redux'

import store from './redux/store'
import { loadInitialData } from './redux/store'
import App from './containers/app'
import {Actions} from '../node_modules/react-native-router-flux'
import _ from 'lodash' // TOFIX: hrmmmm... not sure about having this one in...
import * as serverActions from './redux/actions/serverActions'
import * as shareActions from './redux/actions/shareActions'
import * as appActions from './redux/actions/appActions'
import ActivityAndroid from '../node_modules/react-native-activity-android'
// TOFIX: Clipboard is moved to core
// import Clipboard from '../node_modules/react-native-clipboard'
// import {isValidUrl} from './stringUtils'

// This is necessary because React Components will not have mounted (and thus Router) when we receive the
// event from the Android Native Module. So, I set some state on the redux store and when the components
// are ready they can use that to route to the appropriate component (ShareContainer). TOFIX

DeviceEventEmitter.addListener(
  'IntentReceived',
  (data) => {
    store.dispatch(shareActions.androidIntentReceieved(data))
  }
)

// let CodePush
// if (!__DEV__ && Platform.OS === 'ios') { //eslint-disable-line no-undef
  // CodePush = require('../node_modules/react-native-code-push')
// }

class Root extends Component {

  constructor(props) {
    super(props)

    this.lastIntentUrlReceived = store.getState().share.lastIntentUrlReceived
    this.lastIntentTitleReceived = store.getState().share.lastIntentTitleReceived

    if (this.lastIntentUrlReceived) {
      setTimeout(() => this.loadInitialDataFromReduxStorage(), 1000) // TOFIX: hacky hack hack...FIXME!
    } else {
      this.loadInitialDataFromReduxStorage()
    }
  }

  componentDidMount() {
    // if (!__DEV__ && Platform.OS === 'ios') { //eslint-disable-line no-undef
      // CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE })
    // }
    this.subscribeToAppLifecycleEvents()
  }

  componentWillUnmount() {
    this.removeAppLifecycleEventListeners()
  }

  // TOFIX: do this on LOAD action of redux-store, this is logic that should be in the actions not component
  loadInitialDataFromReduxStorage() {
    loadInitialData((newState) => {
      if (_.get(newState, 'entities.currentUser')) {
        if (_.get(newState, 'entities.friends')) {
          store.dispatch(shareActions.resetSelectedFriends(newState.entities.friends))
          store.dispatch(appActions.resetRequestCount()) //TOFIX: dirty hack; requestCount gets persisted on the entities key
        }
        if (!this.lastIntentUrlReceived) {
          Actions.MainContainer()
          this.refreshData()
        }
      } else {
        // TOFIX: Actions may not have all of the routes by this point (race condition)
        Actions.SignUp()
      }
    })
  }

  subscribeToAppLifecycleEvents() {
    if (Platform.OS === 'ios') {
      AppStateIOS.addEventListener('change', (appState) => {
        if (appState === 'active') {
          this.appDidBecomeActive()
        }
      })
    } else {
      ActivityAndroid.addEventListener('activityResume', () => {
        this.appDidBecomeActive()
      })
    }
  }

  removeAppLifecycleEventListeners() {
    // TOFIX: cleanup later, yolo!
  }

  appDidBecomeActive() {
    // if (!__DEV__ && Platform.OS === 'ios') { //eslint-disable-line no-undef
      // CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE })
    // }
    this.refreshData()
    // let clipboardUrl = store.getState().app.lastClipboardUrl
    // this.checkForUrlInClipboard(clipboardUrl)
  }

  refreshData() {
    // We need our friends list before links received or we'll have "unknown sender" in the inbox cells
    store.dispatch(serverActions.fetchFriends())
    .then(() => {
      store.dispatch(serverActions.fetchLinksReceived())
      store.dispatch(serverActions.fetchLinksSent())
    })
  }

  // checkForUrlInClipboard(urlInStore) {
  //   Clipboard.get((clipboardContents) => {
  //     console.log(urlInStore)
  //     console.log(clipboardContents)
  //     if (isValidUrl(clipboardContents)) {
  //       if (clipboardContents !== urlInStore) {
  //         store.dispatch(appActions.updateLastClipboardUrl(clipboardContents))
  //         Alert.alert(
  //           `URL detected in clipboard!`,
  //           `Would you like to share or add this link to your inbox?\n\n${clipboardContents}`,
  //           [
  //             {text: 'No'},
  //             {text: 'Share', onPress: () => {
  //               Actions.Share({url: clipboardContents, title: '', inAppShare: true})
  //             }},
  //             {text: 'Add to Inbox', onPress: () => {
  //               const {shareFormChanged, shareLink, fetchLinksReceived} = this.props
  //               shareFormChanged('url', clipboardContents)
  //               shareFormChanged('title', '')
  //               shareLink(false)
  //               .then(() => {
  //                 fetchLinksReceived()
  //               })
  //             }},
  //           ]
  //         )
  //       }
  //     }
  //   })
  // }

  render () {
    return (
      <Provider store={store}>
        <App lastIntentUrlReceived={this.lastIntentUrlReceived} lastIntentTitleReceived={this.lastIntentTitleReceived} />
      </Provider>
    )
  }
}

export default Root
