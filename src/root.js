import React from 'react-native'
import { Provider } from 'react-redux/native'
import store from './redux/store'
import { loadInitialData } from './redux/store'
import App from './containers/app'
import {Actions} from '../node_modules/react-native-router-flux'
import _ from 'lodash' // TOFIX: hrmmmm... not sure about having this one in...

class Root extends React.Component {

  constructor(props) {
    super(props)
    loadInitialData((newState) => {
      if (_.get(newState, 'auth.currentUser')) {
        Actions.MainContainer()
      } else {
        Actions.SignUp()
      }
    })
  }

  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

export default Root
