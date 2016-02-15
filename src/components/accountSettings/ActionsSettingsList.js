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

  actionButtonTitle(actionIndex) {
    let title = '-'
    if (actionIndex < this.props.iftttActions.length) {
      title = this.props.iftttActions[actionIndex].actionButtonDisplay
    }
    return title
  }

  render() {
    return (
      <ScrollableTabView style={{flex: 1, height: 258}}
          initialPage={0}
          renderTabBar={() => <ActionsSettingsListTabBar />}
          onChangeTab={(tab) => {
            this.handleTabChange(tab.i)
          }}
      >
        <ActionsSettingsDetail tabLabel={this.actionButtonTitle(0)} actionIndex={0} />
        <ActionsSettingsDetail tabLabel={this.actionButtonTitle(1)} actionIndex={1} />
        <ActionsSettingsDetail tabLabel={this.actionButtonTitle(2)} actionIndex={2} />
        <ActionsSettingsDetail tabLabel={this.actionButtonTitle(3)} actionIndex={3} />
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
