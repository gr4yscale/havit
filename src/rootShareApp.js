import React from 'react-native'
import { Provider } from 'react-redux/native'
import store from './redux/store'
import ShareContainer from './containers/ShareContainer'


class RootShareApp extends React.Component {
  render () {
    console.log('app props')
    console.log(this.props)
    return (
      <Provider store={store}>
        {() => <ShareContainer {...this.props} />}
      </Provider>
    )
  }
}

export default RootShareApp
