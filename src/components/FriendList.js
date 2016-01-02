import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as serverActions from '../redux/actions/serverActions'

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

  cellTapped(rowId) {
    console.log(`tapped ${rowId}`)
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
              <TouchableOpacity onPress={this.cellTapped.bind(this, parseInt(rowId))}>
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

export default connect(
  (state) => {return {friends: state.entities.friends}},
  (dispatch) => {return bindActionCreators(serverActions, dispatch)}
 )(FriendList)
