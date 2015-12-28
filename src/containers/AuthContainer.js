import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
// import * as authActions from '../actions/authActions'

let {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} = React;

// TOFIX: fuck tcomb-form, build auth form myself!

class AuthContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <TouchableHighlight style={styles.button}
              onPress={this.onLoginButtonPress.bind(this)}
              underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Login, motherfucker!</Text>
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
  inputs: {
    marginTop: 80,
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
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch);
}

//select={state => state.get('something').toJS()}
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
