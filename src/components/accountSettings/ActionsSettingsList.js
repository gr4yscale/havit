import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as accountSettingsActions from '../../redux/actions/accountSettingsActions'
import ScrollableTabView from '../../../node_modules/react-native-scrollable-tab-view'
import ActionsSettingsDetail from './ActionsSettingsDetail'
import ActionsSettingsListTabBar from './ActionsSettingsListTabBar'

class ActionsSettingsList extends Component {
  handleTabChange(tab) {
    this.props.dispatch(accountSettingsActions.updateSelectedIftttAction(tab))
  }
  //

  render() {
    // tabLabel is actually an index to refer to ifttt indexes - this is being used to prevent having to re-create scrollable-tab-view}
    return (
      <ScrollableTabView style={{flex: 1, height: 258}}
          initialPage={0}
          renderTabBar={() => <ActionsSettingsListTabBar />}
          onChangeTab={(tab) => {
            this.handleTabChange(tab.i)
          }}
          locked={true}
      >
        <ActionsSettingsDetail tabLabel={0} />
        <ActionsSettingsDetail tabLabel={1} />
        <ActionsSettingsDetail tabLabel={2} />
        <ActionsSettingsDetail tabLabel={3} />
      </ScrollableTabView>
    )
  }
}

export default connect()(ActionsSettingsList)
