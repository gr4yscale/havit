import React from 'react-native'
import style, {COLOR_1, COLOR_5, FONT_SIZE_TITLE} from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

let {
  Component,
  StyleSheet,
  View,
  TextInput,
} = React

export const signUpFormHeight = 450 //TOFIX: hack: this should be measured

class SignUpForm extends Component {

  render() {
    const { signUpFormChanged } = this.props

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
              placeholder={"Name"}
              placeholderTextColor={COLOR_1}
              ref={(component) => this.textInputName = component}
              onChangeText={(value) => signUpFormChanged({field: 'displayName', value})}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Email"}
              placeholderTextColor={COLOR_1}
              ref={(component) => this.textInputEmail = component}
              onChangeText={(value) => signUpFormChanged({field: 'email', value})}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Username"}
              placeholderTextColor={COLOR_1}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(value) => signUpFormChanged({field: 'username', value})}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Password"}
              placeholderTextColor={COLOR_1}
              secureTextEntry={true}
              ref={(component) => this.textInputPassword = component}
              onChangeText={(value) => signUpFormChanged({field: 'password', value})}
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

export default SignUpForm
