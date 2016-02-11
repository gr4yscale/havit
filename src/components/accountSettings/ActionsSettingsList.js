import React from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as accountSettingsActions from '../../redux/actions/accountSettingsActions'
import ScrollableTabView from '../../../node_modules/react-native-scrollable-tab-view'
import ActionsSettingsDetail from './ActionsSettingsDetail'
import ActionsSettingsListTabBar from './ActionsSettingsListTabBar'

let {
  Component,
} = React

class ActionsSettingsList extends Component {
  handleTabChange(tab) {
    this.props.updateSelectedIftttAction(tab)
  }

  render() {
    return (
      <ScrollableTabView style={{flex: 1, height: 220}}
          initialPage={0}
          renderTabBar={() => <ActionsSettingsListTabBar />}
          onChangeTab={(tab) => {
            this.handleTabChange(tab.i)
          }}
      >
        <ActionsSettingsDetail tabLabel={this.props.iftttActions[0].actionButtonDisplay} actionIndex={0} />
        <ActionsSettingsDetail tabLabel={this.props.iftttActions[1].actionButtonDisplay} actionIndex={1} />
        <ActionsSettingsDetail tabLabel={this.props.iftttActions[2].actionButtonDisplay} actionIndex={2} />
        <ActionsSettingsDetail tabLabel={this.props.iftttActions[3].actionButtonDisplay} actionIndex={3} />
      </ScrollableTabView>
    )
  }
}

export default connect(
  (state) => {
    return state.accountSettings
  },
  (dispatch) => {
    return {
      ...bindActionCreators(accountSettingsActions, dispatch),
    }
  }
)(ActionsSettingsList)
