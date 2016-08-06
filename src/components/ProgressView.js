import React, {Component} from 'react'
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native'

import {COLOR_3, COLOR_5} from '../stylesheets/styles'

const deviceWidth = Dimensions.get('window').width;

class ProgressView extends Component {

  constructor(props) {
    super(props)
    this.animation = new Animated.Value(0)
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation() {
    if (!this.props.animate) return

    Animated.timing(this.animation, {toValue: 1, duration: 1000})
    .start((endState) => {
      if (endState.finished) {
        this.animation.setValue(0)
        this.startAnimation()
      }
    })
  }

  render() {
    let scaleStyle = {
      transform: [
        {scaleX: this.animation.interpolate({
          inputRange: [0, 0.50, 1.0],
          outputRange: [1, 4, 1],
        }),
      }],
    }
    let positionStyle = {
      left: this.animation.interpolate({inputRange: [0, 1.0], outputRange: [0, deviceWidth]}),
    }
    let indicatorBG = this.props.indicatorColor ? this.props.indicatorColor : COLOR_3
    return (
      <View style={[styles.container, this.props.extraContainerStyle]}>
        <Animated.View
            style={[styles.animatedIndicator, scaleStyle, positionStyle, {backgroundColor: indicatorBG}]}
        />
      </View>
    )
  }
}

// TOFIX: investigate whether using cairn makes render() slow or not, for now define Stylesheet this way
let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    width: deviceWidth,
    height: 3,
    backgroundColor: COLOR_5,
  },
  animatedIndicator: {
    backgroundColor: COLOR_3,
    width: 40,
    height: 3,
  },
})

export default ProgressView
