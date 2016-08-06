import React, {Component} from 'react'
import {
  View,
  TextInput,
} from 'react-native'

import style from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

class SignUpForm extends Component {

  render() {
    const { signUpFormChanged } = this.props

    return (
      <View {...style('form.container', [{marginTop: 80}])}>
        <HVTCard
            extraStyle={{flex: 1}}
        >
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Name"}
              ref={(component) => this.textInputName = component}
              onChangeText={(value) => signUpFormChanged({field: 'displayName', value})}
              returnKeyType="next"
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.textInputEmail.focus()
                }
              }}
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Email"}
              ref={(component) => this.textInputEmail = component}
              onChangeText={(value) => signUpFormChanged({field: 'email', value})}
              returnKeyType="next"
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.textInputUsername.focus()
                }
              }}
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Username"}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(value) => signUpFormChanged({field: 'username', value})}
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
              onChangeText={(value) => signUpFormChanged({field: 'password', value})}
              returnKeyType="done"
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.props.handleSignUp()
                }
              }}
          />
        </HVTCard>
      </View>
    )
  }
}

export default SignUpForm
