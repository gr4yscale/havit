import React, {Component} from 'react'
import {
    ListView,
} from 'react-native'

import FriendListCell from './FriendListCell'

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
    return nextProps.selectedFriends != this.props.selectedFriends
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
    let dataSource = this.props.selectedFriends ? this.state.dataSource.cloneWithRows(this.props.selectedFriends) : this.state.dataSource.cloneWithRows([])

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
            renderHeader={() => this.renderHeader()}
        />
    );
  }
}

export default FriendList
