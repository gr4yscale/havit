import React, {Component} from 'react'
import {
  Navigator,
  Text,
  TouchableOpacity,
} from 'react-native'

import MainContainer from './MainContainer'
import IntroContainer from './IntroContainer'
import ShareContainer from './ShareContainer'
import FriendAddContainer from './FriendAddContainer'
import {Router, Scene, ActionConst, Actions} from '../../node_modules/react-native-router-flux'

class App extends Component {

  componentDidMount() {
    if (this.props.lastIntentUrlReceived) {
      Actions.Share({url: this.props.lastIntentUrlReceived, title: this.props.lastIntentTitleReceived})
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
        <Route name="Intro" component={IntroContainer} title="Intro" type="replace"
            initial={true}
        />
      </Router>
    )
  }
}

export default App
