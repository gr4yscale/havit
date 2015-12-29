import React from 'react-native'
import { Provider } from 'react-redux/native'
import store from './redux/store'
import App from './containers/app'

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
