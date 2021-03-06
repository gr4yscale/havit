import React, {Component, PropTypes} from 'react'
import {
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'

import style, {COLOR_1, COLOR_5} from '../stylesheets/styles'
let Icon = require('react-native-vector-icons/Ionicons')

class TabBar extends Component {
  constructor(props) {
    super(props)
    this.selectedTabIcons = []
    this.unselectedTabIcons = []
  }

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab})
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this))
  }

  renderTabOption(name, page) {
    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} {...style('tabBar.tab')}>
        <Icon name={name} style={style('tabBar.icon').style} size={style('tabBar.icon').size} color={COLOR_1}
            ref={(icon) => { this.selectedTabIcons[page] = icon }}
        />
        <Icon name={name} style={style('tabBar.icon').style} size={style('tabBar.icon').size} color={COLOR_5}
            ref={(icon) => { this.unselectedTabIcons[page] = icon }}
        />
      </TouchableOpacity>
    )
  }

  setAnimationValue({value}) {
    this.unselectedTabIcons.forEach((icon, i) => {
      let iconRef = icon

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({style: {opacity: value - i}})
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({style: {opacity: i - value}})
      }
    })
  }

  render() {
    let containerWidth = this.props.containerWidth
    let numberOfTabs = this.props.tabs.length
    let indicatorOffset = style('tabBar').activeIconIndicatorOffset

    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0 + indicatorOffset, (containerWidth / numberOfTabs) + indicatorOffset],
    })

    return (
      <View>
        <View {...style('tabBar.tabContainer')}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[style('tabBar.tabDotStyle').style, {left}]} />
      </View>
    )
  }
}

TabBar.PropTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
}

module.exports = TabBar
