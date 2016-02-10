// import { Icon } from '../../node_modules/react-native-icons'
import React from 'react-native'
import style, {COLOR_3} from '../../stylesheets/styles'
import ActionButton from '../ActionButton'

let {
  Component,
  View,
  Animated,
} = React

class ActionsSettingsListTabBar extends Component {
  constructor(props) {
    super(props)
    this.tabs = []
  }

  renderTabOption(actionInitial, page) {
    return (
      <ActionButton
          onPress={() => this.props.goToPage(page)}
          text={actionInitial}
          key={actionInitial}
          ref={(component) => { this.tabs[page] = component}}
          backgroundColor={'orange'}
          onLayout={(event) => {
            console.log(event)
          }}
      />
    )
  }

  render() {

    let containerWidth = this.props.containerWidth
    let numberOfTabs = this.props.tabs.length
    let indicatorOffset = 18

    if (this.tabs[0])
      indicatorOffset = (this.tabs[0].state.buttonWidth / 2.0) - 12 // we have to get the measured button width of first tab to determine how much to offset

    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0 + indicatorOffset, (containerWidth / numberOfTabs) + indicatorOffset],
    })

    return (
      <View>
        <View {...style('actionSettingsTabContainer')}>
          {this.props.tabs.map((actionInitial, i) => this.renderTabOption(actionInitial, i))}
        </View>
        <Animated.View style={[style('actionSettingsTabBar.activeTabIndicatorStyle').style, {left, bottom: 3}]} />
      </View>
    )
  }
}

ActionsSettingsListTabBar.PropTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
}

export default ActionsSettingsListTabBar
