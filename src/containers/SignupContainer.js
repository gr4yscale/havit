import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import {Actions} from '../../node_modules/react-native-router-flux'

const {Surface} = require('gl-react-native')
import ShaderRGBShift from '../gl/ShaderRGBShift'

import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'
import HVTCard from '../components/HVTCard'

import style, {COLOR_1, COLOR_2, COLOR_5} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Animated,

} = React

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

class SignupContainer extends Component {

  constructor(props) {
    super(props)
    this.state={
      pulse: 4.0,
    }
  }

  componentWillMount() {
    this.timingAnim = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.timingAnim, {toValue: 1.0, duration: 250}).start()
  }

  shouldComponentUpdate() {
    console.log('wanting to update')
    return true
  }

  signupButtonPressed() {
    const {signup} = this.props
    signup().then(() => {
      Actions.MainContainer()
      // TOFIX: explictly save our store here to avoid a race so that when the user reloads
      // the app and the user data wasn't saved, they're stuck with sign in screen
    })
  }

  // TOFIX: is this really the best way to handle this?
  handleOnSubmitEditing(event) {
    let text = event.nativeEvent.text
    this.props.signupNext(text)
    if (this.textInput && Platform.os === 'ios') {
      this.textInput.setNativeProps({text: ''})
    }
  }

  handleChangeText(txt) {
    this.setState({pulse: txt.length + 4})
    // setTimeout(() => {
      // this.setState({pulse: 2.0})
    // }, 100)
  }

  renderSignUpButtonIfNeeded() {
    if (this.props.finished)
      return (
        <TouchableOpacity
            style={styles.button}
            underlayColor="#99d9f4"
            onPress={() => this.signupButtonPressed()}
        >
          <Text style={styles.buttonText}>Click here to get started.</Text>
        </TouchableOpacity>
    )
  }

  renderFormIfNeeded() {
    if (!this.props.finished)
      return (
      <View style={styles.formContainer}>
        <HVTCard
            extraStyle={styles.formCard}
        >
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Name"}
              ref={(component) => this.textInputName = component}
              onChangeText={(txt) => this.handleChangeText(txt)}
              onFocus={() => this.handleChangeText('pst')}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Email"}
              ref={(component) => this.textInputEmail = component}
              onChangeText={(txt) => this.handleChangeText(txt)}
              onFocus={() => this.handleChangeText('pst')}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Username"}
              ref={(component) => this.textInputUsername = component}
              onChangeText={(txt) => this.handleChangeText(txt)}
              onFocus={() => this.handleChangeText('pst')}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Password"}
              ref={(component) => this.textInputPassword = component}
              onChangeText={(txt) => this.handleChangeText(txt)}
              onFocus={() => this.handleChangeText('pst')}
              secureTextEntry={true}
          />
        </HVTCard>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Surface
            width={deviceWidth} height={deviceHeight}
            pixelRatio={2}
            style={{position:'absolute', width: deviceWidth, height: deviceHeight, top:0, left: 0}}
            eventsThrough
            visibleContent
        >
          <ShaderRGBShift>
            <View style={styles.container}>
              {this.renderFormIfNeeded()}
              <View style={styles.container}>
                {this.renderSignUpButtonIfNeeded()}
                <HVTButton
                    text={"Sign Up"}
                    onPress={() => {Actions.SignIn()}}
                    extraTouchableStyle={styles.signupButton}
                />
            </View>
            <HVTIconButton
                iconName="ion|android-close"
                size={30}
                color={COLOR_1}
                onPress={() => Actions.MainContainer()}
                extraTouchableStyle={styles.closeButton}
            />
          </View>
        </ShaderRGBShift>
      </Surface>
      </View>
    )
  }
}

const signupCardMargin = 20

let styles = StyleSheet.create({
  container: {
    flex:1,
    height:deviceHeight,
  },
  formCard: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  formContainer: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 66,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  bigText: {
    marginTop: 8,
    marginBottom: 8,
    color:COLOR_2,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 8,
    marginLeft: signupCardMargin / 2,
    marginRight: signupCardMargin / 2,
  },
  closeButton: {
    position:'absolute',
    top: 28,
    left: 10,
    backgroundColor:'rgba(0,0,0,1)',
  },
  inputs: {
    height: 40,
    borderBottomColor: COLOR_5,
    borderBottomWidth: 1,
    backgroundColor: COLOR_1,
    marginLeft: 10,
    padding: 8,
    color: COLOR_2,
  },
})

export default connect(
  (state) => {
    return state.auth.signup
  },
  (dispatch) => {
    return bindActionCreators(serverActions, dispatch);
  }
)(SignupContainer)
