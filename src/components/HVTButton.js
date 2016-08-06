import React, {Component, PropTypes} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

import style from '../stylesheets/styles'

class HVTButton extends Component {

  render() {
    return (
    <TouchableOpacity
        {...style('buttonText.touchable', [this.props.extraTouchableStyle])}
        onPress={() => this.props.onPress()}
        activeOpacity={1}
    >
      <View {...style('buttonText.textWrapper', [this.props.extraTextWrapperStyle])}>
        <Text {...style('buttonText.text', [this.props.extraTextStyle])}>
          {this.props.text}
        </Text>
      </View>
    </TouchableOpacity>)
  }
}

HVTButton.PropTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  borderRadius: PropTypes.number,
  extraTouchableStyle: PropTypes.number,
  extraIconStyle: PropTypes.number,
}

export default HVTButton
