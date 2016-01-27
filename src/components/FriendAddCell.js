import React from 'react-native';
import {Icon} from '../../node_modules/react-native-icons'

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React

class FriendAddCell extends Component {
  handlePress() {
    this.props.onPress(this.props.data)
  }

  renderText() {
    return (
      <Text style={[styles.cellText, {color:'#FF3B7F'}]}>
        {this.props.text}
      </Text>
    )
  }

  renderSelectionIcon() {
    return (
      <Icon
          name={'ion|ios-close-empty'}
          size={30}
          color={'#FF3B7F'}
          style={styles.selectedIcon}
      />
    )
  }

  render() {
    return (
      <TouchableHighlight
          onPress={() => this.handlePress()}
          delayPressIn={0}
          delayPressOut={0}
          underlayColor={'#FFFFFF'}
          activeOpacity={1}
      >
        <View style={styles.row}>
          {this.renderText()}
          {this.renderSelectionIcon()}
        </View>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 0.5,
    opacity: 1.0,
    backgroundColor: '#FFFECE',
    height: 48,
  },
  cellText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 24,
  },
  selectedIcon: {
    position:'absolute',
    right: 10,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
})

// TOFIX: start using propTypes, and be generic!

export default FriendAddCell
