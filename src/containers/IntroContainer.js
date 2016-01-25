import React from 'react-native'
import dismissKeyboard from '../../node_modules/react-native/Libraries/Utilities/dismissKeyboard'
import {Actions} from '../../node_modules/react-native-router-flux'
import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'
import SignUpForm, {signUpFormHeight} from '../components/auth/SignUpForm'
import SignInForm, {signInFormHeight} from '../components/auth/SignInForm'

import style, {COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, FONT_SIZE_TITLE} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
} = React

let deviceHeight = Dimensions.get('window').height

class IntroContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0),
      authMode: 'signin',
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
    return true
  }

  renderSignUpForm() {
    let animationStyle = {
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [-400, -400, 0],
        }),
      }],
    }
    return (
      <Animated.View style={[styles.container,animationStyle]}>
        <SignUpForm/>
      </Animated.View>
    )
  }

  renderSignInForm() {
    let animationStyle = {
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [0, -400, -400],
        }),
      }],
    }
    return (
      <Animated.View style={[styles.container,animationStyle]}>
        <SignInForm />
      </Animated.View>
    )
  }

  renderSignUpButton() {
    let animationStyle = {
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [0, 0, -(deviceHeight - signUpFormHeight)],
        }),
      }],
      opacity: this.state.animation.interpolate({
        inputRange: [-50, 0, 100],
        outputRange: [0, 1, 1],
      }),
    }
    return (
      <Animated.View style={[{backgroundColor:'transparent'},animationStyle]}>
        <HVTButton
            text={"Create an account"}
            onPress={() => {
              this.setState({authMode: 'signup'})
              Animated.timing(
                this.state.animation,
                {
                  toValue: 100,
                  duration: 250,
                  easing: Easing.easeOutCubic,
                },
              ).start(() => {})
            }}
            extraTouchableStyle={styles.buttons}
        />
      </Animated.View>
    )
  }

  renderSignInButton() {
    let animationStyle = {
      opacity: this.state.animation.interpolate({
        inputRange: [-100, 0, 50],
        outputRange: [1, 1, 0],
      }),
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [-(deviceHeight - signInFormHeight), 0, 0],
        }),
      }],
    }
    return (
      <Animated.View style={[{paddingBottom: 20, backgroundColor:'transparent'},animationStyle]}>
        <HVTButton
            text={"Sign In"}
            onPress={() => {
              this.setState({authMode: 'signin'})
              Animated.timing(
                this.state.animation,
                {
                  toValue: -100,
                  duration: 250,
                },
              ).start()
            }}
            extraTouchableStyle={[styles.buttons, {marginTop: 8}]}
        />
      </Animated.View>
    )
  }

  renderBackButton() {
    let animationStyle = {
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [0, -400, 0],
        }),
      },
      ],
    }
    return (
      <Animated.View style={[styles.backButtonWrapper, animationStyle]}>
        <HVTIconButton
            iconName="ion|android-arrow-back"
            size={30}
            color={COLOR_1}
            onPress={() => {
              dismissKeyboard()
              Animated.timing(
                this.state.animation,
                {
                  toValue: 0,
                  duration: 250,
                },
              ).start()
            }}
            extraTouchableStyle={styles.backButton}
        />
      </Animated.View>
    )
  }

  render() {

    let form = this.state.authMode === 'signin' ? this.renderSignInForm() : this.renderSignUpForm()

    return (
      <View style={[styles.container, {backgroundColor:'white'}]}>
        {form}
        {this.renderSignUpButton()}
        {this.renderSignInButton()}
        {this.renderBackButton()}
      </View>
    )
  }
}

const signupCardMargin = 20

let styles = StyleSheet.create({
  container: {
    flex:1,
    height:deviceHeight,
    backgroundColor: 'white',
  },
  buttons: {
    marginTop: 20,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  backButtonWrapper: {
    position:'absolute',
    top: 28,
    left: 10,
    width: 30,
    height: 30,
    backgroundColor:'rgba(0,0,0,1)',
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    backgroundColor:'rgba(0,0,0,1)',
  },
})

export default IntroContainer
