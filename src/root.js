import React from 'react-native'
import { Provider } from 'react-redux/native'
import configureStore from './redux/store/configureStore'

import App from './containers/app'

let {
  View,
  Text
} = React

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

export default Root
