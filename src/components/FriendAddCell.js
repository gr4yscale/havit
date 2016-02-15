import React from 'react-native';
import style from '../stylesheets/styles'
let Icon = require('react-native-vector-icons/Ionicons')

let {
  Component,
  View,
  Text,
  TouchableOpacity,
} = React

class FriendAddCell extends Component {

  render() {
    return (
      <TouchableOpacity
          onPress={() => this.props.onPress()}
          {...style('listCell.touchable')}
      >
        <View {...style('listCell.content')}>
          <Text {...style('listCell.text')}>
              {this.props.text}
          </Text>
          <Icon {...style('listCell.deletionIcon')} />
        </View>
        <View {...style('separator')} />
      </TouchableOpacity>
    )
  }
}

export default FriendAddCell
