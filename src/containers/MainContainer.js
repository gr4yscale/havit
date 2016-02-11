import React from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as appActions from '../redux/actions/appActions'
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import ActivityAndroid from '../../node_modules/react-native-activity-android'
import Clipboard from '../../node_modules/react-native-clipboard'
import TabBar from '../components/TabBar'
import ProgressView from '../components/ProgressView'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import FriendAddContainer from './FriendAddContainer'
import AccountSettingsContainer from './AccountSettingsContainer'
import {isValidUrl} from '../stringUtils'

let {
  Component,
  Platform,
  AppStateIOS,
  Alert,
} = React

class MainContainer extends Component {

  componentDidMount() {
    this.subscribeToAppLifecycleEvents()
  }

  componentWillUnmount() {
    this.removeAppLifecycleEventListeners()
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
    // TOFIX: this may be a bad place for this, but I figured some better UI besides an Alert would happen in the future
    this.checkForUrlInClipboard()
  }

  checkForUrlInClipboard() {
    Clipboard.get((clipboardContents) => {
      if (isValidUrl(clipboardContents)) {
        if (clipboardContents !== this.props.lastClipboardUrl) {
          Alert.alert(
            `URL detected in clipboard!`,
            `Would you like to share or add this link to your inbox?\n\n${clipboardContents}`,
            [
              {text: 'No'},
              {text: 'Share', onPress: () => {
                Actions.Share({url: clipboardContents, title: '', inAppShare: true})
              }},
              {text: 'Add to Inbox', onPress: () => {
                const {shareFormChanged, shareLink, fetchLinksReceived} = this.props
                shareFormChanged('url', clipboardContents)
                shareFormChanged('title', '')
                shareLink(false)
                .then(() => {
                  fetchLinksReceived()
                })
              }},
            ]
          )
          this.props.updateLastClipboardUrl(clipboardContents)
        }
      }
    })
  }

  render() {
    return (
      <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <TabBar />}
          renderProgressView={() => <ProgressView animate={true} />}
          showProgressView={this.props.requestCount > 0}
      >
        <LinksFeedContainer tabLabel="ion|home" />
        <LinksSentContainer tabLabel="ion|paper-airplane" />
        <FriendAddContainer tabLabel="ion|person-stalker" />
        <AccountSettingsContainer tabLabel="ion|gear-a" />
      </ScrollableTabView>
    )
  }
}

export default connect(
  (state) => {
    return state.app
  },
  (dispatch) => {
    return {
      ...bindActionCreators(appActions, dispatch),
      ...bindActionCreators(serverActions, dispatch),
      ...bindActionCreators(shareActions, dispatch),
    }
  }
)(MainContainer)
