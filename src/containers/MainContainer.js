import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as appActions from '../redux/actions/appActions'
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'
import ProgressView from '../components/ProgressView'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import FriendAddContainer from './FriendAddContainer'
import AccountSettingsContainer from './AccountSettingsContainer'
import _ from 'lodash'

class MainContainer extends Component {

  componentWillMount() {
    this.throttledRefreshData = _.throttle(this.refreshData, 60000, {'leading': true, 'trailing': false})
  }

  handleTabChange(tab) {
    // on friends tab fetch "all users" list (for now, this isn't scalable obviously)
    if (tab === 2) {
      this.throttledRefreshData()
    }
  }

  refreshData() {
    this.props.getAllUsers()
    this.props.fetchFriends()
  }

  render() {
    return (
      <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <TabBar />}
          renderProgressView={() => <ProgressView animate={true} />}
          showProgressView={this.props.requestCount > 0}
          onChangeTab={(tab) => {
            this.handleTabChange(tab.i)
          }}
      >
        <LinksFeedContainer tabLabel="md-home" />
        <LinksSentContainer tabLabel="md-paper-plane" />
        <FriendAddContainer tabLabel="md-person" />
        <AccountSettingsContainer tabLabel="md-settings" />
      </ScrollableTabView>
    )
  }
}

export default connect(
  (state) => {
    return state.app
  },
  (dispatch) => {
    return {
      ...bindActionCreators(appActions, dispatch),
      ...bindActionCreators(serverActions, dispatch),
      ...bindActionCreators(shareActions, dispatch),
    }
  }
)(MainContainer)
