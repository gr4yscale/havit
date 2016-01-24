import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import ShaderRGBShift from '../gl/ShaderRGBShift'

import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'
import HVTCard from '../components/HVTCard'

import style, {COLOR_1, COLOR_2, COLOR_3, COLOR_5, FONT_SIZE_HEADING} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
} = React

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

class SignupContainer extends Component {

  constructor(props) {
    super(props)
    this.state={
      shiftAmount: 0.0,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
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

    this.setState({shiftAmount: this.state.shiftAmount + 5})

    // setTimeout(() => {
    //   this.setState({shiftAmount: 0})
    // }, 300)
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
              placeholderTextColor={COLOR_1}
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
              placeholderTextColor={COLOR_1}
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
              placeholderTextColor={COLOR_1}
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
              placeholderTextColor={COLOR_1}
          />
        </HVTCard>
      </View>
    )
  }

  render() {



    return (
      <View style={styles.content}>
          <ShaderRGBShift width={deviceWidth} height={deviceHeight} shiftAmount={this.state.shiftAmount} opaque={false}>
            <View style={[styles.container]}>
              {this.renderFormIfNeeded()}
              <View style={[styles.container]}>
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
      </View>
    )
  }
}

const signupCardMargin = 20

let styles = StyleSheet.create({
  container: {
    flex:1,
    height:deviceHeight,
    backgroundColor:COLOR_3,
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
    marginLeft: 10,
    padding: 8,
    color: COLOR_1,
    fontSize: FONT_SIZE_HEADING,
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
