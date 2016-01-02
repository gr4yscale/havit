import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import FriendList from '../components/FriendList'
import ShareHeader from '../components/ShareHeader'

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class ShareContainer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <FriendList
            headerClass={ShareHeader}
        />

        <View style={{position:'absolute', width:deviceWidth, height: 50, bottom: 0, backgroundColor:'#FF00FF'}}>
          <TouchableHighlight
              style={styles.button}
              underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Share!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#EEEEEE',
    height:deviceHeight - 72,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#FF3B7F',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})

// function mapStateToProps(state) {
//   return {
//     friends: state.entities.friends,
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(serverActions, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(ShareContainer)

export default ShareContainer;
