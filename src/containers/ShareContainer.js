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
  NativeAppEventEmitter,
  NativeModules,
  Platform,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class ShareContainer extends Component {

  componentDidMount() {
    const { friendsSuccess, loginSuccess } = this.props

    // update state with the JSON that we'll get through iOS from the native share extension grabbing it out of
    // the special private container that is provided for the extension to communicate with the app...weird shit

    this.friendsListUpdateSubscription = NativeAppEventEmitter.addListener(
      'FriendsListUpdate',
      (friendsData) => {
        friendsSuccess(friendsData)
      }
    )

    this.currentUserUpdateSubscription = NativeAppEventEmitter.addListener(
      'CurrentUserUpdate',
      (currentUserData) => {
        loginSuccess(currentUserData)
      }
    )
  }

  componentWillUnmount() {
    this.friendsListUpdateSubscription.remove();
    this.currentUserUpdateSubscription.remove();
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
    const {shareLink, postAllIftttActions, shareFormChanged, url, title} = this.props
    // TOFIX: create an action that expresses intent to set state such as
    // "set share state from iOS share extension data"
    shareFormChanged('url', url)
    shareFormChanged('title', title)

    Promise.all([shareLink(), postAllIftttActions()])
    .then(() => {
      console.log('Havit share + IFTTT action requests all completed')
      if (Platform.OS === 'ios') {
        NativeModules.RootShareViewController.shareComplete()
      }
    })
    .catch((error) => {
      console.log('There was an error sharing the love:', error)
    })
  }

  handleCellPressed() {
    this.setState({
      bgColor: incrementColor(this.state.bgColor, 2000),
    })
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
      friendsSuccess: (json) => dispatch(serverActions.friendsSuccess(json)),
      loginSuccess: (json) => dispatch(serverActions.loginSuccess(json)),
      shareLink: () => dispatch(shareActions.shareLink()),
      friendCellTapped: (rowId) => dispatch(shareActions.friendCellTapped(rowId)),
      shareFormChanged: (field, value) => dispatch(shareActions.shareFormChanged(field, value)),
      postAllIftttActions: () => dispatch(shareActions.postAllIftttActions()),
    }
  }
)(ShareContainer)
