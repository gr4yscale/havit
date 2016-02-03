import React from 'react-native';
import {Icon} from '../../node_modules/react-native-icons'
import style from '../stylesheets/styles'

let {
  Component,
  View,
  Text,
  TouchableOpacity,
} = React

class FriendListCell extends Component {
  handlePress() {
    this.props.onPress(this.props.data)
  }

  renderText() {
    if (this.props.data.selected)
      return (
        <Text {...style('listCell.text listCell.textSelected')}>
          {this.props.data.displayName}
        </Text>
      )
    else
      return (
        <Text {...style('listCell.text')}>
            {this.props.data.displayName}
        </Text>
      )
  }

  renderSelectionIcon() {
    if (this.props.data.selected)
      return (<Icon {...style('listCell.selectionIcon')} />)
  }

  render() {
    return (
      <TouchableOpacity
          onPress={() => this.handlePress()}
          {...style('listCell.touchable')}
      >
        <View {...style('listCell.content')}>
          {this.renderText()}
          {this.renderSelectionIcon()}
        </View>
        <View {...style('separator')} />
      </TouchableOpacity>
    )
  }
}

export default FriendListCell
