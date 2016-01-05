import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
import ShareContainer from './ShareContainer'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import CustomTabBar from '../components/CustomTabBar'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <ScrollableTabView style={{marginTop:12}}
            tabBarUnderlineColor={'#FF3B7F'}
            tabBarActiveTextColor={'#FF3B7F'}
            renderTabBar={() => <CustomTabBar />}
        >
          <LinksFeedContainer tabLabel="Inbox" />
          <ShareContainer tabLabel="Share" />
          <AuthContainer tabLabel="Friends" />
        </ScrollableTabView>
    )
  }
}

export default App
