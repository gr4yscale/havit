import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
import SignupContainer from './SignupContainer'
import CustomScrollableTabView from '../components/CustomScrollableTabView'
import CustomTabBar from '../components/CustomTabBar'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
        <CustomScrollableTabView style={{marginTop:0}}
            tabBarUnderlineColor={'#FF3B7F'}
            tabBarActiveTextColor={'#FF3B7F'}
            renderTabBar={() => <CustomTabBar />}
        >
          <SignupContainer tabLabel="Signup" />
          <LinksFeedContainer tabLabel="Inbox" />
          <AuthContainer tabLabel="Friends" />
        </CustomScrollableTabView>
    )
  }
}

export default App
