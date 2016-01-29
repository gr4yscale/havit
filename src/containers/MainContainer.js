import React from 'react-native'
import {connect} from 'react-redux/native'
import ScrollableTabView from '../../node_modules/react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'
import ProgressView from '../components/ProgressView'
import LinksFeedContainer from './LinksFeedContainer'
import LinksSentContainer from './LinksSentContainer'
import FriendAddContainer from './FriendAddContainer'
import IntroContainer from './IntroContainer'

let {
  Component,
} = React

class MainContainer extends Component {

  render() {
    return (
      <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <TabBar />}
          renderProgressView={() => <ProgressView animate={true} />}
          showProgressView={this.props.waitingOnServerRequest}
      >
        <LinksFeedContainer tabLabel="ion|home" />
        <LinksSentContainer tabLabel="ion|paper-airplane" />
        <FriendAddContainer tabLabel="ion|person-stalker" />
        <IntroContainer tabLabel="ion|gear-a" />
      </ScrollableTabView>
    )
  }
}

export default connect(
  (state) => {
    return {
      waitingOnServerRequest: (state.entities.requestCount > 0),
    }
  }
)(MainContainer)
