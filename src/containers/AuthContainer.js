import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'

let {
  Component,
  StyleSheet,
  PropTypes,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Navigator,
} = React

class AuthContainer extends Component {

  constructor(props) {
    super(props);
  }

  loginButtonPressed() {
    const {login, fetchLinksReceived, fetchFriends} = this.props
    const {username, password } = this.props.auth.form.fields
    login(username, password)
    .then(() => fetchFriends())
    .then(() => fetchLinksReceived())
  }

  render() {
    const { loginFormChanged } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.bigText]}>Enter login details below:</Text>
        <View style={styles.form}>
          <TextInput
              style={styles.inputs}
              placeholder={"Username"}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(txt) => loginFormChanged('username',txt)}
          />
          <TextInput
              style={styles.inputs}
              placeholder={"Password"}
              autoCapitalize={'none'}
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(txt) => loginFormChanged('password',txt)}
          />
          <TouchableHighlight
              style={styles.button}
              underlayColor="#99d9f4"
              onPress={this.loginButtonPressed.bind(this)}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
  form: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#2ABFD4',
    borderColor: '#2ABFD4',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputs: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  text: {
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontWeight: '600',
    color:'#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    paddingBottom:4,
    paddingTop:2,
    paddingLeft: 4,
    backgroundColor: '#000000',
  },
  bigText: {
    fontSize: 24,
  },
})

AuthContainer.propTypes = {
  loginFormChanged: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch);
}

// for using Immutable.js - get a pure JS object to work with instead of an immutable.js wrapper
//select={state => state.get('something').toJS()}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
