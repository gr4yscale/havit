import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import {MKButton} from 'react-native-material-kit';
import LinkCell from '../components/LinkCell'

let {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  LinkingIOS,
  Alert,
  Platform,
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const PlainFab = MKButton.plainFab()
  .withBackgroundColor('#FF3B7F')
  .withOnPress(() => {
    console.log('Hi, its a colored button!');
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
  }

  componentDidMount() {
    const { fetchLinksReceived, fetchFriends } = this.props
    //TOFIX: setTimeout is being used to prevent changing state before it's loaded from persistence layer
    setTimeout(function() {
      fetchLinksReceived()
    }, 200);

    setTimeout(function() {
      fetchFriends()
    }, 300);
  }

  handleLinkCellTapped(rowID, data) {
    console.log('toggling accordion for +', rowID)
    console.log(data)
    // if (Platform.OS === 'ios') {
    //   LinkingIOS.openURL(data.url)
    // } else {
    //   Alert.alert(
    //     'Not yet!',
    //     'Feature not yet implemented on Android!'
    //   )
    // }
  }

  handleLinkCellAction(data, actionType) {
    console.log(actionType)
  }

  render() {
    let dataSource = this.props.links ? this.state.dataSource.cloneWithRows(this.props.links) : this.state.dataSource.cloneWithRows([])
    let statusIndicator = <Text style={{color:'#FF3B7F', paddingRight:4, fontWeight:'800'}}>●</Text>

    return (
      <View style={styles.container}>
        <ListView
            dataSource = {dataSource}
            renderRow = {(data, sectionId, rowId) => {
              let props = {rowId, data}
              return (
                <LinkCell
                    onLinkCellTapped={(rowID,data) => this.handleLinkCellTapped(rowID,data)}
                    onLinkCellAction={(data,actionType) => this.handleLinkCellAction(data,actionType)}
                    {...props}
                />
              )
            }}
            initialListSize={20}
            pageSize={4}
            style = {styles.listView}
        />

        <View style={{position:'absolute', width:48, left: deviceWidth / 2 - 24, height: 80, bottom: 0}}>
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
    backgroundColor:'#EAEAEA',
    height:deviceHeight - 66,
  },
  content: {
    flex:1,
  },
  listView: {
    // backgroundColor: '#FFCCB9',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop:-0.5,
    // paddingTop: 4,
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
