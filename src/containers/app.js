import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
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
} = React

class MainContainer extends React.Component {
  render() {
    return (
      <CustomScrollableTabView style={{marginTop:0}}
          tabBarUnderlineColor={'#FF3B7F'}
          tabBarActiveTextColor={'#FF3B7F'}
          renderTabBar={() => <CustomTabBar />}
      >
        <LinksFeedContainer tabLabel="Inbox" />
        <ShareContainer tabLabel="Share" />
        <FriendAddContainer tabLabel="Friends" />
      </CustomScrollableTabView>
    )
  }
}

class App extends React.Component {

  componentDidMount() {
    if (this.props.lastIntentUrlReceived) {
      Actions.Share({url: this.props.lastIntentUrlReceived})
    }
  }

  shouldComponentUpdate() {
    return false
  }

  createRightButton () {
    return (
      <TouchableOpacity
          touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
          style={[ExNavigator.Styles.barLeftButton]}
          onPress={() => {Actions.pop()}}
      >
        <Text style={[ExNavigator.Styles.barLeftButtonText]}>Close</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Router hideNavBar={true} >
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />

        <Route name="MainContainer" component={MainContainer} title="Inbox" initial={true} />
        <Route name="Share" component={ShareContainer} title="Share" />
        <Route name="Friends" component={FriendAddContainer} title="Friends" />

        <Route name="Authenticate" wrapRouter={true} >
          <Router hideNavBar={false}>
          <Route name="SignUp"
              component={SignupContainer} title="Sign up" schema="modal" renderLeftButton={this.createRightButton}
          />
          <Route name="SignIn"
              component={AuthContainer} title="Sign in" schema="modal" renderLeftButton={this.createRightButton}
              sceneStyle={{paddingTop: 64}}
          />
          </Router>
        </Route>
      </Router>
    )
  }
}

export default App
