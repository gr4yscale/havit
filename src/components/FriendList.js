import React from 'react-native';

let {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
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
              let text = rowData.selected ?
                <Text style={styles.cellText}>[x] {rowData.displayName}</Text> : <Text style={styles.cellText}>[ ] {rowData.displayName}</Text>
              return (
              <TouchableHighlight
                  onPress={this.onRowPressed.bind(this, parseInt(rowId))}
                  delayPressIn={0}
                  delayPressOut={0}
                  underlayColor={'#FF3B7F'}
              >
                <View style={styles.row}>
                  <Text>
                    {text}
                  </Text>
                </View>
              </TouchableHighlight>
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
    height:deviceHeight - 72, // TOFIX
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    marginBottom: 0.5,
    opacity: 0.9,
    backgroundColor: '#FFFFFF',
  },
  cellText: {
    color: '#333333',
    fontWeight: '600',
    // backgroundColor: '#99EEFF',
  },
})

export default FriendList
