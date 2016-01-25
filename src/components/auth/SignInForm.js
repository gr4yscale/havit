import React from 'react-native'
import style, {COLOR_1, COLOR_5, FONT_SIZE_TITLE} from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

let {
  Component,
  StyleSheet,
  View,
  TextInput,
} = React

export const signInFormHeight = 280 //TOFIX: hack: this should be measured

class SignInForm extends Component {

  // onSubmitEditing={(event) => this.handleFieldChanged('username', event)}
  // onBlur={(event) => this.handleFieldChanged('username', event)}
  // handleFieldChanged(field, event) {
  //   const { loginFormChanged } = this.props
  //   loginFormChanged({field, value: event.nativeEvent.text})
  // }

  render() {
    const { loginFormChanged } = this.props

    return (
      <View style={styles.formContainer}>
        <HVTCard
            extraStyle={styles.container}
        >
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Username"}
              placeholderTextColor={COLOR_1}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(value) => loginFormChanged({field: 'username', value})}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Password"}
              placeholderTextColor={COLOR_1}
              ref={(component) => this.textInputPassword = component}
              secureTextEntry={true}
              onChangeText={(value) => loginFormChanged({field: 'password', value})}
          />
        </HVTCard>
      </View>
    )
  }
}

const signupCardMargin = 20

let styles = StyleSheet.create({
  container: {
    flex:1,
  },
  formCard: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 80,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  inputs: {
    height: 40,
    borderBottomColor: COLOR_5,
    borderBottomWidth: 1,
    marginLeft: 10,
    padding: 8,
    color: COLOR_1,
    fontSize: FONT_SIZE_TITLE,
  },
})

export default SignInForm
