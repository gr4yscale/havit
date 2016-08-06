import React, {Component} from 'react'

import { Provider } from 'react-redux/native'
import store from './redux/store'
import ShareContainer from './containers/ShareContainer'


class RootShareApp extends Component {

  componentDidMount() {
    if (!__DEV__ && Platform.OS === 'ios') { //eslint-disable-line no-undef
      const CodePush = require('../node_modules/react-native-code-push')
      CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE })
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render () {
    return (
      <Provider store={store}>
        {() => <ShareContainer {...this.props} />}
      </Provider>
    )
  }
}

export default RootShareApp
