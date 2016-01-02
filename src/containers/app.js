import React from 'react-native'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
// TOFIX: remove presentation (styling) and navigator out of here, setup redux provider here, remove root.js

let {
  StyleSheet,
  View,
} = React

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <ScrollableTabView style={{marginTop:8, paddingTop:14}}
            tabBarUnderlineColor={'#FF3B7F'}
            tabBarActiveTextColor={'#FF3B7F'}
        >
          <ShareContainer tabLabel="Share" />
          <LinksFeedContainer tabLabel="Inbox" />
          <AuthContainer tabLabel="Friends" />
        </ScrollableTabView>
    )
  }
}

export default App
