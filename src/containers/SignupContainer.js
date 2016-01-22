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

import style, {COLOR_2, COLOR_3, COLOR_5} from '../stylesheets/styles'

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

    // <HVTTextInput
    //     width={deviceWidth - 200}
    //     height={40}
    //     onSubmitEditing={(event) => this.handleOnSubmitEditing(event)}
    //     ref={(component)=>this.textInput = component}
    // />
  //
  //   if (!this.props.finished)
  //     return (
  //     <View style={styles.formContainer}>
  //       <HVTCard
  //           width={deviceWidth-60}
  //           height={200}
  //       >
  //       <Text {...style('text.huge', [styles.bigText])} >{this.props.promptText}</Text>
  //
  //       </HVTCard>
  //     </View>
  //   )
  // }

  // <Text {...style('text.huge', [styles.bigText])} >{this.props.promptText}</Text>

    if (!this.props.finished)
      return (

      <HVTCard
          width={deviceWidth - (signupCardMargin + 4)}
          height={signupCardHeight}
          extraStyle={styles.formCard}
      >
        <TextInput
            {...style('text.heading textInput.flatInput', [styles.textInputs, styles.textInputName])}
            {...this.props}
            autoCapitalize={'none'}
            autoCorrect={false}
            blurOnSubmit={false}
            ref={(component)=>this.textInputName = component}
            placeholder={"Name"}
        />
        <TextInput
            {...style('text.heading textInput.flatInput', [styles.textInputs, styles.textInputUserName])}
            {...this.props}
            autoCapitalize={'none'}
            autoCorrect={false}
            blurOnSubmit={false}
            ref={(component)=>this.textInputUserName = component}
            placeholder={"Username"}
        />
        <TextInput
            {...style('text.heading textInput.flatInput', [styles.textInputs, styles.textInputEmail])}
            {...this.props}
            autoCapitalize={'none'}
            autoCorrect={false}
            blurOnSubmit={false}
            ref={(component)=>this.textInputEmail = component}
            placeholder={"Email"}
        />
        <TextInput
            {...style('text.heading textInput.flatInput', [styles.textInputs, styles.textInputPassword])}
            {...this.props}
            autoCapitalize={'none'}
            autoCorrect={false}
            blurOnSubmit={false}
            ref={(component)=>this.textInputPassword = component}
            placeholder={"Password"}
        />

      </HVTCard>
    )
  }

  render() {
    // <BlackWhiteTripShader width={deviceWidth} height={deviceHeight} pixelRatio={2} animate={true} />


    // <HVTButton
    //     text={"Click here to sign up if you already have an account."}
    //     onPress={() => Actions.SignIn()}
    //     extraTouchableStyle={styles.signupButton}
    // />

    return (
      <View style={styles.container}>
        {this.renderFormIfNeeded()}
        {this.renderFinishButtonIfNeeded()}



        <HVTIconButton
            iconName="ion|android-close"
            size={30}
            color={COLOR_3}
            onPress={() => Actions.MainContainer()}
            extraTouchableStyle={styles.closeButton}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLOR_3,
    height:deviceHeight,
  },
  formCard: {
    flex: 0,
    marginTop: 70,
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
    left: 18,
    backgroundColor:'rgba(0,0,0,0)',
  },

  // big chunk of stupidity - get HVTCard working with flexbox
  textInputs: {
    width: deviceWidth - (signupCardMargin + 20 + 4),
    height: 40,
    borderColor: COLOR_5,
    marginLeft: 10,
  },
  textInputName: {
    top: 8,
  },
  textInputUserName: {
    top: 48,
  },
  textInputEmail: {
    top: 88,
  },
  textInputPassword: {
    top: 128,
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
