import React from 'react-native';
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
// import AnimGL from '../gl/animGL'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableHighlight,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class SignupContainer extends Component {

  signupButtonPressed() {
    const {signup} = this.props
    signup()
    //  TOFIX: dismiss the navigator here
    // .then(dispatch('route!!!!'))
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
        <TouchableHighlight
            style={styles.button}
            underlayColor="#99d9f4"
            onPress={() => this.signupButtonPressed()}
        >
          <Text style={styles.buttonText}>Click here to get started.</Text>
        </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.bigText}>{this.props.promptText}</Text>
        {this.renderFormIfNeeded()}
        {this.renderFinishButtonIfNeeded()}
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
  shaderWrapper: {
    position:'absolute',
    width: deviceWidth,
    height: deviceHeight,
    top:0,
    left: 0,
    opacity: 0.4,
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
  bigText: {
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 24,
    fontWeight: '600',
    color:'#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 130,
    paddingBottom:4,
    paddingTop:2,
    paddingLeft: 4,
    backgroundColor: '#000000',
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
})

export default connect(
  (state) => {
    return state.auth.signup
  },
  (dispatch) => {
    return {
      signupNext: (textEntered) => dispatch(serverActions.signupNext(textEntered)),
      signup: () => dispatch(serverActions.signup()),
    }
  }
)(SignupContainer)
