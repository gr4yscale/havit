import React from 'react-native';
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'

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

  componentDidMount() {
    const { fetchFriends } = this.props
    setTimeout(function() {
      fetchFriends()
    }, 200);
  }

  // TOFIX: passing the props down this way is definitely not the right way to do it
  // TOFIX: being sloppy and just giving the header everything coming down from the app component, yikes
  renderHeader() {
    return (
      <ShareHeader shareFormChanged={this.props.shareFormChanged}
          {...this.props}
      />
    )
  }

  shareButtonPressed() {
    const {shareLink} = this.props
    shareLink()
  }

  render() {
    return (
      <View style={styles.container}>
        <FriendList
            {...this.props}
            header={this.renderHeader.bind(this)}
        />

        <View style={{position:'absolute', width:deviceWidth, height: 50, bottom: 0, backgroundColor:'#FF00FF'}}>
          <TouchableHighlight
              onPress={() => this.shareButtonPressed()}
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
    height:deviceHeight - 66,
    paddingTop:50,
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

export default connect(
  (state) => {
    return {
      friends: state.share.selectedFriends,
    }
  },
  (dispatch) => {
    return {
      fetchFriends: () => dispatch(serverActions.fetchFriends()),
      shareLink: () => dispatch(serverActions.shareLink()),
      friendCellTapped: (rowId) => dispatch(shareActions.friendCellTapped(rowId)),
      shareFormChanged: (field, value) => dispatch(shareActions.shareFormChanged(field, value)),
    }
  }
)(ShareContainer)
