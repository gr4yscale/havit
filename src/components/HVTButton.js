import React from 'react-native'
import style from '../stylesheets/styles'

let {
  Component,
  View,
  TouchableOpacity,
  Text,
  PropTypes,
} = React

class HVTButton extends Component {

  render() {
    return (
    <TouchableOpacity
        {...style('buttonText.touchable', [this.props.extraTouchableStyle])}
        onPress={() => this.props.onPress()}
    >
      <View {...style('buttonText.textWrapper', {borderRadius: this.props.borderRadius})}>
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
