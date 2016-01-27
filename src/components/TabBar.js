import { Icon } from '../../node_modules/react-native-icons'
import React from 'react-native'
import { COLOR_1, COLOR_3, COLOR_4, COLOR_5 } from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} = React

const iconSize = 30
const activeIconIndicatorOffset = 41

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
    // let isTabActive = this.props.activeTab === page

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Icon name={name} size={iconSize} color={COLOR_1} style={styles.icon}
            ref={(icon) => { this.selectedTabIcons[page] = icon }}
        />
        <Icon name={name} size={iconSize} color={COLOR_5} style={styles.icon}
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
        iconRef.setNativeProps({opacity: value - i})
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({opacity: i - value})
      }
    })
  }

  render() {
    let containerWidth = this.props.containerWidth
    let numberOfTabs = this.props.tabs.length

    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0 + activeIconIndicatorOffset, (containerWidth / numberOfTabs) + activeIconIndicatorOffset],
    })

    return (
      <View>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[styles.tabUnderlineStyle, {left}]} />
      </View>
    )
  }
}

TabBar.PropTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
}

let styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  tabs: {
    height: 64,
    flexDirection: 'row',
    paddingTop: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 4,
    backgroundColor: COLOR_4,
    justifyContent: 'center',
  },
  icon: {
    width: iconSize,
    height: iconSize,
    position: 'absolute',
    top: 0,
    left: 32,
  },
  tabUnderlineStyle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    backgroundColor: COLOR_3,
    bottom: 6,
  },
})

module.exports = TabBar
