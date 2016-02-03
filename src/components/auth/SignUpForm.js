import React from 'react-native'
import style from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

let {
  Component,
  View,
  TextInput,
} = React

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
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Email"}
              ref={(component) => this.textInputEmail = component}
              onChangeText={(value) => signUpFormChanged({field: 'email', value})}
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Username"}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(value) => signUpFormChanged({field: 'username', value})}
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Password"}
              secureTextEntry={true}
              ref={(component) => this.textInputPassword = component}
              onChangeText={(value) => signUpFormChanged({field: 'password', value})}
          />
        </HVTCard>
      </View>
    )
  }
}

export default SignUpForm
