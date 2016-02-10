import React from 'react-native'
import ScrollableTabView from '../../../node_modules/react-native-scrollable-tab-view'
import ActionsSettingsDetail from './ActionsSettingsDetail'
import ActionsSettingsListTabBar from './ActionsSettingsListTabBar'

let {
  Component,
} = React

class ActionsSettingsList extends Component {

  render() {
    return (
      <ScrollableTabView style={{flex: 1, height: 220}}
          initialPage={0}
          renderTabBar={() => <ActionsSettingsListTabBar />}
      >
        <ActionsSettingsDetail tabLabel="A" />
        <ActionsSettingsDetail tabLabel="B" />
        <ActionsSettingsDetail tabLabel="C" />
        <ActionsSettingsDetail tabLabel="D" />
      </ScrollableTabView>
    )
  }
}

export default ActionsSettingsList
