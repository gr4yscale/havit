import React from 'react-native'
import dismissKeyboard from '../../node_modules/react-native/Libraries/Utilities/dismissKeyboard'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as authActions from '../redux/actions/authActions'
import {authModeSignIn, authModeSignUp} from '../redux/actions/authActions'
import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'
import SignUpForm from '../components/auth/SignUpForm'
import SignInForm from '../components/auth/SignInForm'

import {COLOR_1, COLOR_2} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Alert,
} = React

const deviceHeight = Dimensions.get('window').height
const signupCardMargin = 20

class IntroContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0),
      signUpFormHeight: 0,
      signInFormHeight: 0,
      signUpButtonheight: 0,
      signInButtonHeight: 0,
    }
  }

  componentDidMount() {
    this.props.authModeReset()
  }

  shouldComponentUpdate() {
    return true
  }

  handleSignUpPressed() {
    if (this.props.authMode !== authModeSignUp) {
      Animated.timing(this.state.animation, {toValue: 100, duration: 250}).start()
    }
    this.props.authSignUpButtonPressed()
    .catch((error) => {
      Alert.alert('Error Signing Up!', `The error returned from the server was:\n\n${error}`)
    })
    dismissKeyboard()
  }

  handleSignInPressed() {
    if (this.props.authMode !== authModeSignIn) {
      Animated.timing(this.state.animation, {toValue: -100, duration: 250}).start()
    }
    this.props.authSignInButtonPressed()
    .catch((error) => {
      Alert.alert('Error Signing In!', `The error returned from the server was:\n\n${error}`)
    })
    dismissKeyboard()
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
      <Animated.View style={animationStyle}
          onLayout={(event) => {
            // console.log('laying out sign up', event.nativeEvent.layout.height)
            this.setState({signUpFormHeight: event.nativeEvent.layout.height})
          }}
      >
        <SignUpForm signUpFormChanged={this.props.signUpFormChanged} handleSignUp={() => this.handleSignUpPressed()} />
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
      <Animated.View style={animationStyle}
          onLayout={(event) => {
            this.setState({signInFormHeight: event.nativeEvent.layout.height})
          }}
      >
        <SignInForm signInFormChanged={this.props.signInFormChanged} handleSignIn={() => this.handleSignInPressed()} />
      </Animated.View>
    )
  }

  renderSignUpButton() {
    let animationStyle = {
      transform: [
        {translateY: this.state.animation.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [0, 0, -(deviceHeight - this.state.signUpFormHeight) + this.state.signUpButtonHeight], // 152 being the origin of sign up button, roughly
        }),
      }],
      opacity: this.state.animation.interpolate({
        inputRange: [-50, 0, 100],
        outputRange: [0, 1, 1],
      }),
    }

    return (
      <Animated.View style={[animationStyle]}
          onLayout={(event) => {
            this.setState({signUpButtonHeight: deviceHeight - event.nativeEvent.layout.y})
          }}
      >
        <HVTButton
            text={"Create an account"}
            onPress={() => this.handleSignUpPressed()}
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
          outputRange: [-(deviceHeight - this.state.signInFormHeight) + this.state.signInButtonHeight, 0, 0],
        }),
      }],
    }

    return (
      <Animated.View style={animationStyle}
          onLayout={(event) => {
            this.setState({signInButtonHeight: deviceHeight - event.nativeEvent.layout.y})
          }}
      >
        <HVTButton
            text={"Sign In"}
            onPress={() => this.handleSignInPressed()}
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
            iconName="android-close"
            size={30}
            color={COLOR_1}
            onPress={() => {
              dismissKeyboard()
              Animated.timing(this.state.animation, { toValue: 0, duration: 250}).start(() => this.props.authModeReset())
            }}
            extraTouchableStyle={styles.backButton}
        />
      </Animated.View>
    )
  }

  render() {
    let form = this.props.authMode === 'signin' ? this.renderSignInForm() : this.renderSignUpForm()
    return (
      <View style={[styles.container, {paddingBottom: 20}]}>
        {form}
        <View style={styles.container} />
        {this.renderSignUpButton()}
        {this.renderSignInButton()}
        {this.renderBackButton()}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttons: {
    marginTop: 10,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  backButtonWrapper: {
    position:'absolute',
    top: 28,
    left: 10,
    width: 30,
    height: 30,
    backgroundColor:COLOR_2,
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    backgroundColor:COLOR_2,
  },
})

export default IntroContainer

export default connect(
  (state) => {
    return state.auth
  },
  (dispatch) => {
    return bindActionCreators(authActions, dispatch);
  }
)(IntroContainer)
