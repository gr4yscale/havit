import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'
import {MKButton} from 'react-native-material-kit';

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

  linkCellTapped(data) {
    LinkingIOS.openURL(data.url)
  }

  render() {
    let dataSource = this.props.links ? this.state.dataSource.cloneWithRows(this.props.links) : this.state.dataSource.cloneWithRows([])
    let statusIndicator = <Text style={{color:'#FF3B7F', paddingRight:4, fontWeight:'800'}}>●</Text>

    return (
      <View style={styles.container}>
        <ListView
            dataSource = {dataSource}
            renderRow = {(rowData) => {
              return (
              <TouchableOpacity onPress={this.linkCellTapped.bind(this, rowData)}>
                <View style={styles.row}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    {statusIndicator}
                    <View style={{flexDirection: 'column', flex: 1,marginLeft: 4}}>
                      <Text
                          style={styles.titleText}
                          numberOfLines={6}
                      >
                        {rowData.title}
                      </Text>
                      <Text
                          style={styles.urlText}
                          numberOfLines={1}
                      >
                        {rowData.url}
                      </Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            )
            }}
            initialListSize={20}
            pageSize={4}
            style = {styles.listView}
        />
        <View style={{position:'absolute', width:deviceWidth, height: 80, bottom: 0}}>
        <View style={{flex: 1,alignItems:'center'}}>
          <PlainFab>
            <Image
                pointerEvents="none"
                source={require('../../img/plus_white.png')}
            />
          </PlainFab>
        </View>
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
  content: {
    flex:1,
  },
  listView: {
    // backgroundColor: '#FFCCB9',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    // marginLeft:4,
    // marginRight:4,
    marginBottom: 0.5,
    opacity: 0.9,
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    color: '#000000',
    fontWeight: '600',
    // backgroundColor: '#99EEFF',
  },
  urlText: {
    color: '#444444',
    fontWeight: '200',
    // backgroundColor: '#9999FF',
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
