import React from 'react-native'
// import AuthContainer from './AuthContainer'
import LinksInboxContainer from './LinksInboxContainer'

// TOFIX: remove presentation (styling) and navigator out of here, setup redux provider here, remove root.js


let {
  StyleSheet,
  Navigator,
} = React

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    let Component = route.component

    return (
      <Component navigator={navigator}
          route={route}
      />
    )
  }

  configureScene() {
    return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  render() {
    return (
      <Navigator
          ref="navigator"
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: LinksInboxContainer,
            name: 'LinksInboxContainer',
          }}
      />
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

export default App
