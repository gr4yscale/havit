import React, {Component} from 'react'
import {
  View,
  TextInput,
} from 'react-native'

import style from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

class SignInForm extends Component {

  render() {
    const { signInFormChanged } = this.props

    return (
      <View {...style('form.container', [{marginTop: 80}])}>
        <HVTCard
            extraStyle={{flex: 1}}
        >
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Username"}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(value) => signInFormChanged({field: 'username', value})}
              returnKeyType="next"
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.textInputPassword.focus()
                }
              }}
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Password"}
              secureTextEntry={true}
              ref={(component) => this.textInputPassword = component}
              onChangeText={(value) => signInFormChanged({field: 'password', value})}
              returnKeyType="done"
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.props.handleSignIn()
                }
              }}
          />
        </HVTCard>
      </View>
    )
  }
}

export default SignInForm
