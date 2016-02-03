import React from 'react-native'
import style from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

let {
  Component,
  View,
  TextInput,
} = React

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
          />
          <TextInput
              {...style('text.heading form.textInput')}
              placeholder={"Password"}
              secureTextEntry={true}
              ref={(component) => this.textInputPassword = component}
              onChangeText={(value) => signInFormChanged({field: 'password', value})}
          />
        </HVTCard>
      </View>
    )
  }
}

export default SignInForm
