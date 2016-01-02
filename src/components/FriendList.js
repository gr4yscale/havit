import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
// import {fetchFriends} from '../redux/actions/serverActions' // tofix: have container compnoent hook this up and pass it in
import * as serverActions from '../redux/actions/serverActions'
import * as shareActions from '../redux/actions/shareActions'

let {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableOpacity,
  Dimensions,
} = React

let deviceHeight = Dimensions.get('window').height;

class FriendList extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(['dummy row1']),
    }
  }

  componentDidMount() {
    const { fetchFriends } = this.props
    setTimeout(function() {
      fetchFriends()
    }, 200);
  }

  onRowPressed(rowId) {
    console.log(`tapped ${rowId}`)
    const { friendListCellTapped } = this.props
    friendListCellTapped(rowId)
  }

  renderHeader() {
    return (
      <this.props.headerClass />
    )
  }

  render() {
    let dataSource = this.props.friends ? this.state.dataSource.cloneWithRows(this.props.friends) : this.state.dataSource.cloneWithRows([])

    return (
        <ListView
            dataSource = {dataSource}
            renderRow = {(rowData, sectionId, rowId) => {
              return (
              <TouchableOpacity onPress={this.onRowPressed.bind(this, parseInt(rowId))}>
                <View style={styles.row}>
                  <Text>
                    {rowData.displayName}
                  </Text>
                </View>
              </TouchableOpacity>
              )
            }}
            initialListSize={20}
            pageSize={4}
            style = {styles.listView}
            renderHeader={this.renderHeader.bind(this)}
        />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    height:deviceHeight - 72,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    marginBottom: 0.5,
    opacity: 0.9,
    backgroundColor: '#FFFFFF',
  },
})

function mapDispatchToProps(dispatch) {
  return {
    fetchFriends: () => dispatch(serverActions.fetchFriends()),
    friendListCellTapped: (rowId) => dispatch(shareActions.friendListCellTapped(rowId)),
  // return bindActionCreators(serverActions, dispatch);
  }
}

export default connect(
  (state) => {return {friends: state.entities.friends}},
  mapDispatchToProps
 )(FriendList)

 // (dispatch) => {
 //   debugger;;
 //   return {
 //     fetchFriends: () => dispatch(fetchFriends()),
 //     friendListCellTapped: (rowId) => dispatch(friendListCellTapped(rowId)),
 //   }
 // }
