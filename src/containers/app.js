import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import IntroContainer from './IntroContainer'
import ShareContainer from './ShareContainer'
import FriendAddContainer from './FriendAddContainer'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'
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
      <ScrollableTabView initialPage={0} renderTabBar={() => <TabBar />}>
        <LinksFeedContainer tabLabel="ion|home" />
        <LinksSentContainer tabLabel="ion|paper-airplane" />
        <FriendAddContainer tabLabel="ion|person-stalker" />
        <IntroContainer tabLabel="ion|gear-a" />
      </ScrollableTabView>
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
    console.log('app: shouldComponentUpdate')
    return true
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
    console.log('app: render')
    return (
      <Router hideNavBar={true} >
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />

        <Route name="MainContainer" component={MainContainer} title="Inbox" type="replace" />
        <Route name="Share" component={ShareContainer} title="Share" type="replace" />
        <Route name="Friends" component={FriendAddContainer} title="Friends" />
        <Route name="Intro" component={IntroContainer} title="Intro" type="replace" renderLeftButton={this.createRightButton}  initial={true} />
      </Router>
    )
  }
}

export default App
