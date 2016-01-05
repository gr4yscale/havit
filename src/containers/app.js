import React from 'react-native'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import LinksFeedContainer from './LinksFeedContainer'
import AuthContainer from './AuthContainer'
import ShareContainer from './ShareContainer'
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
        <CustomScrollableTabView style={{marginTop:12}}
            tabBarUnderlineColor={'#FF3B7F'}
            tabBarActiveTextColor={'#FF3B7F'}
            renderTabBar={() => <CustomTabBar />}
            onChangeTab={() => {
              console.log('on change tab')
              const { fetchLinksReceived } = this.props
              fetchLinksReceived()
            }}
        >
          <ShareContainer tabLabel="Share" />
          <LinksFeedContainer tabLabel="Inbox" />
          <AuthContainer tabLabel="Friends" />
        </CustomScrollableTabView>
    )
  }
}
// TOFIX: hack for now to get links list to update when swiping over
export default connect(
  (state) => { return state},
  (dispatch) => {
    return {
      fetchLinksReceived: () => dispatch(serverActions.fetchLinksReceived()),
    }
  }
)(App)

// export default App
