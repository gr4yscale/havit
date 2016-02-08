import React from 'react-native';
import {Icon} from '../../node_modules/react-native-icons'
import style from '../stylesheets/styles'

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
          onPress={() => this.props.onPress(this.props.data)}
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
