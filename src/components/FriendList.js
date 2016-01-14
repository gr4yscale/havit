import React from 'react-native';
import FriendListCell from './FriendListCell'

let {
  Component,
  StyleSheet,
  ListView,
  Dimensions,
} = React

let deviceHeight = Dimensions.get('window').height;

class FriendList extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.objectId !== r2.objectId,
    })
    this.state = {
      dataSource: ds.cloneWithRows(['dummy row1']),
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.friends != this.props.friends
  }

  onCellPressed(data) {
    const { friendCellTapped } = this.props
    friendCellTapped(data.objectId)
    this.props.onCellPressed()
  }

  // TOFIX: this sucks, fix it
  renderHeader() {
    return (
      <this.props.header />
    )
  }

  render() {
    let dataSource = this.props.friends ? this.state.dataSource.cloneWithRows(this.props.friends) : this.state.dataSource.cloneWithRows([])

    return (
        <ListView
            dataSource = {dataSource}
            renderRow = {(data, sectionId, rowId) => {
              let props = {rowId, data}
              return (
                <FriendListCell
                    onPress={() => this.onCellPressed(data)}
                    {...props}
                />
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
