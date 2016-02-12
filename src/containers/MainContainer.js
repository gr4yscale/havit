import React from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as appActions from '../redux/actions/appActions'
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import ActivityAndroid from '../../node_modules/react-native-activity-android'
import TabBar from '../components/TabBar'
import ProgressView from '../components/ProgressView'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import FriendAddContainer from './FriendAddContainer'
import AccountSettingsContainer from './AccountSettingsContainer'

let {
  Component,
} = React

class MainContainer extends Component {

    }
  }

  render() {
    return (
      <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <TabBar />}
          renderProgressView={() => <ProgressView animate={true} />}
          showProgressView={this.props.requestCount > 0}
      >
        <LinksFeedContainer tabLabel="ion|home" />
        <LinksSentContainer tabLabel="ion|paper-airplane" />
        <FriendAddContainer tabLabel="ion|person-stalker" />
        <AccountSettingsContainer tabLabel="ion|gear-a" />
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
