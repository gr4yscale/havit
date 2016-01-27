import React from 'react-native'
import style, {COLOR_1} from '../stylesheets/styles'
import {Icon} from '../../node_modules/react-native-icons'

let {
  Component,
  TouchableOpacity,
  PropTypes,
} = React

class HVTIconButton extends Component {

  render() {
    return (
    <TouchableOpacity
        {...style('buttonIcon', [{width: this.props.size, height: this.props.size}, this.props.extraTouchableStyle])}
        onPress={() => this.props.onPress()}
        activeOpacity={1}
    >
      <Icon
          color={this.props.color ? this.props.color : COLOR_1}
          size={this.props.size}
          name={this.props.iconName}
          {...style('buttonIcon', [{width: this.props.size, height: this.props.size}, this.props.extraIconStyle])}
      />
    </TouchableOpacity>)
  }
}

HVTIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
  extraTouchableStyle: PropTypes.number,
  extraIconStyle: PropTypes.number,
}

export default HVTIconButton
