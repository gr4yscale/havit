import React from 'react-native'
import style, {COLOR_1, FONT_SIZE_TITLE} from '../../stylesheets/styles'
import HVTCard from '../HVTCard'

let {
  Component,
  StyleSheet,
  View,
  TextInput,
} = React

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
              underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
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
    flex: 0,
    flexDirection: 'row',
    marginTop: 80,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  inputs: {
    height: 40,
    marginLeft: 10,
    padding: 8,
    color: COLOR_1,
    fontSize: FONT_SIZE_TITLE,
  },
})

export default SignUpForm
