import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import {Actions} from '../../node_modules/react-native-router-flux'
// import BlackWhiteTripShader from '../gl/BlackWhiteTripShader'
// import StyleSheet from '../stylesheets/debugStylesheet.js'

import HVTTextInput from '../components/HVTTextInput'
import HVTButton from '../components/HVTButton'
import HVTIconButton from '../components/HVTIconButton'

import style, {COLOR_2, COLOR_3} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

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
    if (!this.props.finished)
      return (
      <View style={styles.formContainer}>
        <Text {...style('text.huge', [styles.bigText])} >{this.props.promptText}</Text>
        <HVTTextInput
            width={deviceWidth - 42}
            height={40}
            onSubmitEditing={(event) => this.handleOnSubmitEditing(event)}
            ref={(component)=>this.textInput = component}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFormIfNeeded()}
        {this.renderFinishButtonIfNeeded()}

        <HVTButton
            text={"Click here to sign up if you already have an account."}
            onPress={() => Actions.SignIn()}
            extraTouchableStyle={styles.signupButton}
        />

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
  formContainer: {
    flex: 0,
    height: 100, // label + text input
    marginTop: 70,
    marginLeft: 20,
    marginRight: 18,
    backgroundColor: 'transparent',
  },
  bigText: {
    paddingBottom:4,
    marginBottom: 4,
    paddingTop:2,
    paddingLeft: 4,
    color:COLOR_2,
    backgroundColor:COLOR_3,
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
})

export default connect(
  (state) => {
    return state.auth.signup
  },
  (dispatch) => {
    return bindActionCreators(serverActions, dispatch);
  }
)(SignupContainer)
