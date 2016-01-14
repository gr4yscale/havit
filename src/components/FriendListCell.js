import React from 'react-native';
import {Icon} from '../../node_modules/react-native-icons'

let {
  Component,
  StyleSheet,
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
        <Text style={[styles.cellText, {color:'#FF3B7F', fontWeight:'600'}]}>
          {this.props.data.displayName}
        </Text>
      )
    else
      return (
        <Text style={styles.cellText}>
            {this.props.data.displayName}
        </Text>
      )
  }

  renderSelectionIcon() {
    if (this.props.data.selected)
      return (
        <Icon
            name={'ion|android-done'}
            size={30}
            color={'#FF3B7F'}
            style={styles.selectedIcon}
        />
    )
  }

  render() {
    return (
      <TouchableOpacity
          onPress={() => this.handlePress()}
          delayPressIn={0}
          delayPressOut={0}
          underlayColor={'#FFFFFF'}
      >
        <View style={styles.row}>
          {this.renderText()}
          {this.renderSelectionIcon()}
        </View>
      </TouchableOpacity>
    )
  }
}

let styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0.5,
    opacity: 1.0,
    backgroundColor: '#EEEEEE',
    height: 48,
  },
  cellText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 22,
  },
  selectedIcon: {
    position:'absolute',
    right: 10,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
})

export default FriendListCell
