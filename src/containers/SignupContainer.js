import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import BlackWhiteTripShader from '../gl/BlackWhiteTripShader'
// import StyleSheet from '../stylesheets/debugStylesheet.js'

import HVTTextInput from '../components/HVTTextInput'
import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'
import HVTCard from '../components/HVTCard'

import style, {COLOR_1, COLOR_2, COLOR_3, COLOR_5} from '../stylesheets/styles'

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

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const signupCardMargin = 20
const signupCardHeight = 176


class SignupContainer extends Component {

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

  renderFinishButtonIfNeeded() {
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

    // <TextInput
    //     {...style('text.heading', [styles.textInputs, styles.textInputUserName])}
    //     {...this.props}
    //     autoCapitalize={'none'}
    //     autoCorrect={false}
    //     blurOnSubmit={false}
    //     ref={(component)=>this.textInputUserName = component}
    //     placeholder={"Username"}
    // />
    // <TextInput
    //     {...style('text.heading', [styles.textInputs, styles.textInputEmail])}
    //     {...this.props}
    //     autoCapitalize={'none'}
    //     autoCorrect={false}
    //     blurOnSubmit={false}
    //     ref={(component)=>this.textInputEmail = component}
    //     placeholder={"Email"}
    // />
    // <TextInput
    //     {...style('text.heading', [styles.textInputs, styles.textInputPassword])}
    //     {...this.props}
    //     autoCapitalize={'none'}
    //     autoCorrect={false}
    //     blurOnSubmit={false}
    //     ref={(component)=>this.textInputPassword = component}
    //     placeholder={"Password"}
    // />


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
          />

          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Email"}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Username"}
          />

          <TextInput
              {...style('text.heading', [styles.inputs])}
              {...this.props}
              autoCapitalize={'none'}
              autoCorrect={false}
              blurOnSubmit={false}
              placeholder={"Password"}
          />





        </HVTCard>
      </View>
    )
  }

  render() {
    // <BlackWhiteTripShader width={deviceWidth} height={deviceHeight} pixelRatio={2} animate={true} />


    return (

      <View style={styles.container}>
<BlackWhiteTripShader width={deviceWidth} height={deviceHeight} pixelRatio={2} animate={true} />

      <View style={styles.container}>



        {this.renderFormIfNeeded()}

        <View style={styles.container}>
          {this.renderFinishButtonIfNeeded()}

          <HVTButton
              text={"Click here to sign up if you already have an account."}
              onPress={() => Actions.SignIn()}
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
      </View>
    );
  }
}

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
    flex: 1.0,
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
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
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
