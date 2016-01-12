import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
import ShareContainer from './ShareContainer'
import SignupContainer from './SignupContainer'
import CustomScrollableTabView from '../components/CustomScrollableTabView'
import CustomTabBar from '../components/CustomTabBar'
import {Router, Route} from '../../node_modules/react-native-router-flux'


class MainContainer extends React.Component {
  render() {
    return (
      <CustomScrollableTabView style={{marginTop:0}}
          tabBarUnderlineColor={'#FF3B7F'}
          tabBarActiveTextColor={'#FF3B7F'}
          renderTabBar={() => <CustomTabBar />}
      >
        <LinksFeedContainer tabLabel="Inbox" />
        <SignupContainer tabLabel="Signup" />
      </CustomScrollableTabView>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Router hideNavBar={true} >
        <Route name="SignUp" component={SignupContainer} title="Signup" />
        <Route name="MainContainer" component={MainContainer} title="Inbox" initial={true} />
        <Route name="SignIn" component={AuthContainer} title="Sign in" />
        <Route name="Share" component={ShareContainer} title="Share" />
      </Router>
    )
  }
}

export default App
