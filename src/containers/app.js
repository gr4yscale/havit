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
      <View style={styles.container}>
        <ScrollableTabView style={{marginTop:-2}}
            tabBarUnderlineColor={'#E91E63'}
            tabBarActiveTextColor={'#E91E63'}
        >
          <LinksFeedContainer tabLabel="Inbox" />
          <AuthContainer tabLabel="Sent" />
          <AuthContainer tabLabel="Friends" />
        </ScrollableTabView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
})

export default App
