import React, {Component, PropTypes} from 'react'
import {
  View,
  TextInput,
} from 'react-native'

import style from '../stylesheets/styles'
// import StyleSheet from '../stylesheets/debugStylesheet'

class HVTTextInput extends Component {

  setNativeProps(obj) {
    this.textInput.setNativeProps(obj)
  }

  render() {
    return (
    <View {...style('container')}>
      <View {...style('textInput.shadow', [{width: this.props.width, height: this.props.height}])} />
      <TextInput
          {...style('text.heading textInput.input', [{width: this.props.width, height: this.props.height}])}
          {...this.props}
          autoCapitalize={'none'}
          autoCorrect={false}
          blurOnSubmit={false}
          ref={(component)=>this.textInput = component}
      />
    </View>
    )
  }
}

HVTTextInput.PropTypes = {
  handleOnSubmitEditing: PropTypes.func,
}

export default HVTTextInput
