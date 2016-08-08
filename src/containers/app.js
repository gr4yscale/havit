import React, {Component} from 'react'
import MainContainer from './MainContainer'
import IntroContainer from './IntroContainer'
import ShareContainer from './ShareContainer'
import FriendAddContainer from './FriendAddContainer'
import {Router, Scene, ActionConst, Actions} from '../../node_modules/react-native-router-flux'
import store from '../redux/store'
import * as shareActions from '../redux/actions/shareActions'

class App extends Component {
  componentDidMount() {
    // TOFIX: ugh, yucky race condition hack - react-native-router-flux
    // see https://github.com/aksonov/react-native-router-flux/issues/686, issue isn't resolved
    if (this.props.lastIntentUrlReceived) {
      setTimeout(() => {
        store.dispatch(shareActions.shareFormChanged('url', this.props.lastIntentUrlReceived))
        store.dispatch(shareActions.shareFormChanged('title', this.props.lastIntentTitleReceived))
      }, 100)
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
    return (
      <Router hideNavBar={true}>
        <Scene key="root">
          <Scene key="Intro" component={IntroContainer} title="Intro" type={ActionConst.REPLACE} initial={!this.props.lastIntentUrlReceived} />
          <Scene key="MainContainer" component={MainContainer} title="Inbox" type={ActionConst.REPLACE} />
          <Scene key="Share" component={ShareContainer} title="Share" type={ActionConst.REPLACE} initial={this.props.lastIntentUrlReceived} />
          <Scene key="Friends" component={FriendAddContainer} title="Friends" />
        </Scene>
      </Router>
    )
  }
}

export default App
