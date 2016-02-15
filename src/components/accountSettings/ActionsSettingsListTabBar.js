// import { Icon } from '../../node_modules/react-native-icons'
import React from 'react-native'
import {connect} from 'react-redux/native'
import style, {COLOR_5} from '../../stylesheets/styles'
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

  actionButtonTitle(actionIndex) {
    let title = '-'
    if (actionIndex < this.props.iftttActions.length) {
      title = this.props.iftttActions[actionIndex].actionButtonDisplay
    }
    return title
  }

  renderActionButton(actionIndex, page) {
    let title = this.actionButtonTitle(actionIndex)

    return (
      <ActionButton
          onPress={() => this.props.goToPage(page)}
          text={title}
          key={page}
          ref={(component) => { this.tabs[page] = component}}
          backgroundColor={COLOR_5}
          forceCircleBackground={true}
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
          {this.props.tabs.map((actionIndex, i) => this.renderActionButton(actionIndex, i))}
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

export default connect(
  (state) => {
    return state.accountSettings
  }
)(ActionsSettingsListTabBar)
