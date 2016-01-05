import {Icon} from '../../node_modules/react-native-icons'
import React from 'react-native';

let {
  Component,
  StyleSheet,
  View,
  Text,
  Animated,
} = React

class CustomTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let currentPage = this.props.activeTab

    let previousTitle = this.props.tabs[currentPage]
    let nextTitle = this.props.tabs[currentPage + 1]

    let previousTitleStyle = {
      transform: [{
        translateX: this.props.scrollValue.interpolate(
          {inputRange: [0, 0.5], outputRange: [30.0, 4.0]}
        ),
      }],
      opacity: this.props.scrollValue.interpolate(
        {inputRange: [0, 0.45], outputRange: [1.0, 0.0]}
      ),
      position: 'absolute',
      left: 30,
    }

    let nextTitleStyle = {
      transform: [{
        translateX: this.props.scrollValue.interpolate(
          {inputRange: [0.5, 1.0], outputRange: [8.0, -18.0]}
        ),
      }],
      opacity: this.props.scrollValue.interpolate(
        {inputRange: [0.45, 1.0], outputRange: [0.0, 1.0]}
      ),
      position: 'absolute',
      left: 78,
    }

    return (
      <View>
        <View style={styles.tabs}>
          <Icon
              name={'ion|navicon'}
              size={30}
              color={'#000000'}
              style={styles.navIcon}
          />
          <Animated.View style={[previousTitleStyle]}>
            <Text style={styles.titleText}>{previousTitle}</Text>
          </Animated.View>
          <Animated.View style={[nextTitleStyle]}>
            <Text style={styles.titleText}>{nextTitle}</Text>
          </Animated.View>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 54,
    flexDirection: 'row',
    paddingTop: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  titleText: {
    height: 32,
    // backgroundColor:'#ff00ff',
    marginLeft: 0,
    marginTop: 8,
    color: '#000000',
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 24,
  },
  navIcon: {
    marginTop: 8,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
})

export default CustomTabBar;
