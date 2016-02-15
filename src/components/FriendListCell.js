import React from 'react-native';
import style from '../stylesheets/styles'
let Icon = require('react-native-vector-icons/Ionicons')

let {
  Component,
  View,
  Text,
  TouchableOpacity,
} = React

class FriendListCell extends Component {

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
          onPress={() => this.props.onPress(this.props.data)}
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
