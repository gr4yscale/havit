import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import BlackWhiteTripShader from '../gl/blackWhiteTripShader'
import {Icon} from '../../node_modules/react-native-icons'
import StyleSheet from '../stylesheets/debugStylesheet.js'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
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
  handleTextEntered(event) {
    let text = event.nativeEvent.text
    this.props.signupNext(text)
    if (this.textInput) {
      this.textInput.setNativeProps({text: ''})
    }
  }

  renderFormIfNeeded() {
    if (!this.props.finished)
      return (
      <View style={styles.formContainer}>
        <View style={styles.formShadow} />
        <View style={styles.formContent}>
          <TextInput
              style={styles.inputs}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={(event) => this.handleTextEntered(event)}
              ref={(component)=>this.textInput = component}
          />
        </View>
      </View>
    )
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

  renderSignupButton() {
    return (
      <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          underlayColor="#99d9f4"
          onPress={() => Actions.SignIn()}
      >
        <Text style={[styles.buttonText, styles.smallText, {textAlign: 'center'}]}>Click here to sign in if you already have an account.</Text>
      </TouchableOpacity>
    )
  }

  renderFancyShaderBackgroundIfIOS() {
    if (Platform.OS === 'ios') {
      return (<BlackWhiteTripShader width={deviceWidth} height={deviceHeight} pixelRatio={2} collapsable={false} />)
    }
  }

  renderCloseButton() {
    return (
      <TouchableOpacity
          onPress={() => Actions.MainContainer()}
          style={{position: 'absolute', top: 30, left: 18, width: 30, height: 30, backgroundColor:'transparent'}}
      >
        <Icon
            name={'ion|android-close'}
            size={30}
            color={'#FFFFFF'}
            style={styles.closeIcon}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFancyShaderBackgroundIfIOS()}
        <Text style={[styles.text, styles.bigText]}>{this.props.promptText}</Text>
        {this.renderFormIfNeeded()}
        {this.renderFinishButtonIfNeeded()}
        {this.renderSignupButton()}
        {this.renderCloseButton()}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FF3B7F',
    height:deviceHeight - 62, // - 62 when custom navbar is show
  },
  formContainer: {
    marginTop: 8,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#FF1E63',
  },
  formContent: {
    backgroundColor: '#FFFFFF',
    position:'absolute',
    width: deviceWidth - 60,
    height: 40,
  },
  formShadow: {
    backgroundColor:'#000000',
    position:'absolute',
    width: deviceWidth - 60,
    height: 40,
    marginLeft: 6,
    marginTop: 6,
    opacity: 0.3,
  },
  inputs: {
    height: 40,
    borderWidth: 0,
    padding: 8,
    color:'#000000',
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 16,
    // fontWeight: '600',
  },
  text: {
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontWeight: '600',
    color:'#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 100,
    paddingBottom:4,
    paddingTop:2,
    paddingLeft: 4,
    backgroundColor: '#000000',
  },
  bigText: {
    fontSize: 24,
  },
  smallText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor:'#000000',
    padding: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center',
    fontFamily:'AvenirNext-Medium',
    fontWeight: '400',
  },
  button: {
    height: 40,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
  },
  signupButton: {
    marginTop: 160,
    backgroundColor: 'transparent',
  },
  closeIcon: {
    position:'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor:'transparent',
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
