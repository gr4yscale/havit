import React from 'react-native';
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import FriendList from '../components/FriendList'
import ShareHeader from '../components/ShareHeader'
import {Icon} from '../../node_modules/react-native-icons'
import AnimGL from '../gl/animGL'
import style from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  NativeAppEventEmitter,
  NativeModules,
  Platform,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// credit: brentvatne from his example in
// https://github.com/brentvatne/react-native-linear-gradient
function incrementColor(color, step){
  let colorToInt = parseInt(color.substr(1), 16)
  let nstep = parseInt(step)
  if (!isNaN(colorToInt) && !isNaN(nstep)) {
    colorToInt += nstep
    let ncolor = colorToInt.toString(16)
    ncolor = '#' + (new Array(7-ncolor.length).join(0)) + ncolor
    if (/^#[0-9a-f]{6}$/i.test(ncolor)) {
      return ncolor
    }
  }
  return color;
}

class ShareContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {bgColor:'#9922FF'} //cc22aa
  }

  componentDidMount() {
    const {resetSelectedFriends, shareFormChanged, url, title} = this.props
    if (Platform.OS === 'ios') {
      this.subscribeToDataUpdateEvents()
    } else if (this.props.friends) {
      resetSelectedFriends(this.props.friends)
    }
    // We receive title and url from the share extension intially, but ultimately want child compeonnts to
    // react to changes in the redux store so when friend cells are tapped the title/url/comment fields don't
    // get overwritten by old data in these initial props.
    // TOFIX: make this a different action such as "LOAD FROM NATIVE SHARE MODULE"
    shareFormChanged('url', url)
    shareFormChanged('title', title)
  }

  shouldComponentUpdate() {
    console.log('sharecontainer: shouldComponentUpdate')
    return true
  }

  componentWillUnmount() {
    if (Platform.os === 'android') {
      this.friendsListUpdateSubscription.remove();
      this.currentUserUpdateSubscription.remove();
    }
  }

  // update state with the JSON that we'll get through iOS from the native share extension grabbing it out of
  // the special private container that is provided for the extension to communicate with the app...weird shit
  subscribeToDataUpdateEvents() {
    const {friendsSuccess, loginSuccess, resetSelectedFriends} = this.props
    this.friendsListUpdateSubscription = NativeAppEventEmitter.addListener(
      'FriendsListUpdate',
      (friendsList) => {
        friendsSuccess(friendsList)
        resetSelectedFriends(friendsList.results)
      }
    )
    this.currentUserUpdateSubscription = NativeAppEventEmitter.addListener(
      'CurrentUserUpdate',
      (currentUserData) => {
        loginSuccess(currentUserData)
      }
    )
  }

  shareButtonPressed() {
    if (!this.props.shareDataValid) return

    const {shareLink, postAllIftttActions, fetchLinksSent } = this.props

    Promise.all([shareLink(), postAllIftttActions()])
    .then(() => {
      this.close()
      fetchLinksSent()
    })
    .catch((error) => {
      console.log('There was an error sharing the love:', error)
    })
  }

  close() {
    if (this.props.inAppShare) {
      Actions.MainContainer()
    } else if (Platform.OS === 'ios' && !this.props.inAppShare) {
      NativeModules.RootShareViewController.shareComplete()
    } else if (Platform.OS === 'android') {
      Actions.MainContainer()
    }
  }

  handleCellPressed() {
    //TOFIX: debug
    return
    this.setState({
      bgColor: incrementColor(this.state.bgColor, 2000),
    })
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

  renderCloseButton() {
    return (
      <TouchableOpacity
          onPress={() => this.close()}
          style={{position: 'absolute', top: 20, left: 10, width: 30, height: 30}}
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

  renderFancyShaderBackgroundIfIOS() {
    if (Platform.OS === 'ios') {
      return (<AnimGL width={deviceWidth} height={deviceHeight} pixelRatio={2} />)
    }
  }

  render() {

    let shareButtonTouchableStyle = 'buttonBottomBar.touchable buttonBottomBar.touchableInvalid'
    let shareButtonTextStyle = 'buttonBottomBar.text buttonBottomBar.textInvalid'
    if (this.props.shareDataValid === true) {
      shareButtonTouchableStyle = 'buttonBottomBar.touchable buttonBottomBar.touchableValid'
      shareButtonTextStyle = 'buttonBottomBar.text buttonBottomBar.textValid'
    }
    return (
      <View style={[styles.container, {backgroundColor:this.state.bgColor}]}>
        {this.renderFancyShaderBackgroundIfIOS()}
        <FriendList
            {...this.props}
            header={this.renderHeader.bind(this)}
            onCellPressed={() => this.handleCellPressed()}
        />

        <View {...style('buttonBottomBar.container')}>
          <TouchableOpacity
              onPress={() => this.shareButtonPressed()}
              {...style(shareButtonTouchableStyle)}
              activeOpacity={this.props.shareDataValid ? 0 : 0.5}
          >
            <Text {...style(shareButtonTextStyle)}>Share!</Text>
          </TouchableOpacity>
        </View>
        {this.renderCloseButton()}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    height:deviceHeight - 66,
    paddingTop:50,
    paddingBottom: 60,
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
  closeIcon: {
    position:'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
  },
})

export default connect(
  (state) => {
    return {
      selectedFriends: state.share.selectedFriends,
      friends: state.entities.friends,
      titleRedux: state.share.form.title,
      urlRedux: state.share.form.url,
      commentRedux: state.share.form.comment,
      shareDataValid: state.share.shareDataValid,
    }
  },
  (dispatch) => {
    return {
      friendsSuccess: (json) => dispatch(serverActions.friendsSuccess(json)),
      loginSuccess: (json) => dispatch(serverActions.loginSuccess(json)),
      shareLink: () => dispatch(shareActions.shareLink()),
      resetSelectedFriends: (payload) => dispatch(shareActions.resetSelectedFriends(payload)),
      friendCellTapped: (rowId) => dispatch(shareActions.friendCellTapped(rowId)),
      shareFormChanged: (field, value) => dispatch(shareActions.shareFormChanged(field, value)),
      postAllIftttActions: () => dispatch(shareActions.postAllIftttActions()),
      fetchLinksSent: () => dispatch(serverActions.fetchLinksSent()),
    }
  }
)(ShareContainer)
