import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import {MKButton} from 'react-native-material-kit';
import LinkCell from '../components/LinkCell'
import * as LinkCellActionTypes from '../components/LinkCell'
import {Actions} from '../../node_modules/react-native-router-flux'
import AnimGL from '../gl/animGL'

let {
  Component,
  StyleSheet,
  View,
  ListView,
  Image,
  Dimensions,
  LinkingIOS,
  Alert,
  Platform,
  IntentAndroid,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const PlainFab = MKButton.plainFab()
  .withBackgroundColor('#FF3B7F')
  .withOnPress(() => {
    Actions.Share({inAppShare: true})
  })
  .build();


class LinksFeedContainer extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
    this.cells = {}
  }

  componentDidMount() {
    console.log('LinksFeedContainer componentDidMount')
  }

  handleLinkCellTapped(rowID) {
    return
    let cellRowID = parseInt(rowID)
    for (let i=0; i<Object.keys(this.cells).length; i++) {
      if (i !== cellRowID) {
        this.cells[i].close()
      }
    }
  }

  openURL(url) {
    if (Platform.OS === 'ios') {
      LinkingIOS.openURL(url)
    } else {
      IntentAndroid.openURL(url)
    }
  }

  alertNotImplemented() {
    Alert.alert(
      'Not yet!',
      'Feature not yet implemented on Android!'
    )
  }

  saveToPocket(url) {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({'value1':url}),
    }
    let iftttURL = 'https://maker.ifttt.com/trigger/havit_send_to_pocket/with/key/[redacted]'
    fetch(iftttURL, requestOptions)
  }

  handleLinkCellAction(data, actionType) {
    switch(actionType) {
      case LinkCellActionTypes.FriendListCellActionTypeBrowser:
        this.openURL(data.url)
        break
      case LinkCellActionTypes.FriendListCellActionTypeReshare:
        Actions.Share({url: data.url, title: data.title, inAppShare: true})
        break
      case LinkCellActionTypes.FriendListCellActionTypePin:
        this.alertNotImplemented()
        break
      case LinkCellActionTypes.FriendListCellActionTypeUserAction1:
        this.saveToPocket(data.url)
        break
      case LinkCellActionTypes.FriendListCellActionTypeUserAction2:
        this.alertNotImplemented()
        break
      case LinkCellActionTypes.FriendListCellActionTypeUserAction3:
        this.alertNotImplemented()
        break
      default:
        break
    }
    console.log(actionType)
  }

  renderFancyShaderBackgroundIfIOS() {
    if (Platform.OS === 'ios') {
      return (<AnimGL width={deviceWidth} height={deviceHeight} pixelRatio={2} />)
    }
  }

  render() {

    let dataSource = this.props.links ? this.state.dataSource.cloneWithRows(this.props.links) : this.state.dataSource.cloneWithRows([])
    return (
      <View style={styles.container}>
        {this.renderFancyShaderBackgroundIfIOS()}
        <ListView
            dataSource = {dataSource}
            renderRow = {(data, sectionId, rowID) => {
              return (
                <LinkCell
                    onLinkCellTapped={(rowID,data) => this.handleLinkCellTapped(rowID,data)}
                    onLinkCellAction={(data,actionType) => this.handleLinkCellAction(data,actionType)}
                    ref={(cell) => this.cells[rowID] = cell}
                    rowID={rowID}
                    data={data}
                />
              )
            }}
            initialListSize={20}
            pageSize={4}
            style = {styles.listView}
        />
        <View style={{position:'absolute', width:48, left: deviceWidth / 2 - 24, height: 80, bottom: 0, backgroundColor: 'rgba(0,0,0,0)'}}>
          <PlainFab>
            <Image
                pointerEvents="none"
                source={require('../../img/plus_white.png')}
            />
          </PlainFab>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FFFFFF',
    height:deviceHeight - 62,
  },
  content: {
    flex:1,
  },
  listView: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 0,
  },
})

export default connect(
  (state) => {
    return {
      links: state.entities.links,
    }
  },
  (dispatch) => {
    return bindActionCreators(serverActions, dispatch)
  }
)(LinksFeedContainer)
