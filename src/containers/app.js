import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import AuthContainer from './AuthContainer'
import IntroContainer from './IntroContainer'
import ShareContainer from './ShareContainer'
import SignupContainer from './SignupContainer'
import FriendAddContainer from './FriendAddContainer'
import CustomScrollableTabView from '../components/CustomScrollableTabView'
import CustomTabBar from '../components/CustomTabBar'
import {Router, Route, Schema} from '../../node_modules/react-native-router-flux'
import {Actions} from '../../node_modules/react-native-router-flux'
import ExNavigator from '../../node_modules/@exponent/react-native-navigator';

let {
  Navigator,
  Text,
  TouchableOpacity,
  AppStateIOS,
} = React

class MainContainer extends React.Component {

  handleNavIconPress() {
    Actions.SignUp()
  }

  render() {
    return (
      <CustomScrollableTabView style={{marginTop:0}}
          tabBarUnderlineColor={'#FF3B7F'}
          tabBarActiveTextColor={'#FF3B7F'}
          renderTabBar={() => <CustomTabBar onNavIconPress={() => this.handleNavIconPress()} />}
      >
        <LinksFeedContainer tabLabel="Inbox" />
        <LinksSentContainer tabLabel="Inbox" />
        <FriendAddContainer tabLabel="Friends" />
      </CustomScrollableTabView>
    )
  }
}

class App extends React.Component {

  componentDidMount() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange)
    AppStateIOS.addEventListener('memoryWarning', this._handleMemoryWarning)

    if (this.props.lastIntentUrlReceived) {
      Actions.Share({url: this.props.lastIntentUrlReceived})
    }
  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange)
    AppStateIOS.removeEventListener('memoryWarning', this._handleMemoryWarning)
  }

  shouldComponentUpdate() {
    console.log('app: shouldComponentUpdate')
    return true
  }

  _handleAppStateChange(currentAppState) {
    console.log(currentAppState)
  }

  _handleMemoryWarning() {
    console.log('********** MEMORY WARNING!!! ************')
  }

  createRightButton () {
    return (
      <TouchableOpacity
          touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
          style={[ExNavigator.Styles.barLeftButton]}
          onPress={() => {Actions.MainContainer()}}
      >
        <Text style={[ExNavigator.Styles.barLeftButtonText]}>Close</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Router hideNavBar={true} >
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />

        <Route name="MainContainer" component={MainContainer} title="Inbox" type="replace" />
        <Route name="Share" component={ShareContainer} title="Share" type="replace" />
        <Route name="Friends" component={FriendAddContainer} title="Friends" />
        <Route name="SignUp" component={SignupContainer} title="Sign Up" type="replace" renderLeftButton={this.createRightButton} />
        <Route name="SignIn" component={AuthContainer} title="Sign In" type="replace" renderLeftButton={this.createRightButton} />
        <Route name="Intro" component={IntroContainer} title="Intro" type="replace" renderLeftButton={this.createRightButton} initial={true} />
      </Router>
    )
  }
}

export default App
