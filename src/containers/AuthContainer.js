import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as authActions from '../redux/actions/authActions'

let {
  Component,
  StyleSheet,
  PropTypes,
  View,
  TouchableHighlight,
  Text,
  TextInput,
} = React

class AuthContainer extends Component {

  constructor(props) {
    super(props);
  }

  loginButtonPressed() {
    const { login } = this.props;
    let username = this.props.auth.form.fields.username;
    let password = this.props.auth.form.fields.password;
    login(username, password);
  }

  render() {
    const { loginFormChanged } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
              style={styles.inputs}
              placeholder={"Username"}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoFocus={true}
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
            <Text style={styles.buttonText}>Log the f*ck in!</Text>
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
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
  return bindActionCreators(authActions, dispatch);
}

// for using Immutable.js - get a pure JS object to work with instead of an immutable.js wrapper
//select={state => state.get('something').toJS()}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
