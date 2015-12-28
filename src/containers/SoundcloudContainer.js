import React from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux/native'
import * as soundcloudActions from '../redux/actions/soundcloudActions';

let {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
} = React;

class SoundcloudContainer extends Component {

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
    const { fetchComments } = this.props
    fetchComments()
  }

  displayUser() {
    // const { navigator } = this.props
    // dispatch(selectUser(comments.items[i].user));

    // InteractionManager.runAfterInteractions(() => {
      // navigator.push({
        // component: UserContainer,
        // name: 'User',
      // })
    // })
  }

  render() {
    console.log(this.props);
    let comments = this.props.comments.items;
    let dataSource = comments ? this.state.dataSource.cloneWithRows(comments) : this.state.dataSource.cloneWithRows([])

    return (
      <View style={styles.container}>
        <ListView
            dataSource = {dataSource}
            renderRow = {(rowData, sectionId, rowId) => {
              return (
              <TouchableOpacity onPress={this.displayUser.bind(this, parseInt(rowId))}>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                  <Image
                      source={{uri: rowData.user.avatar_url}}
                      style={styles.rowThumbnail}
                  />
                  <View style={{flexDirection: 'column', flex: 1,marginLeft: 4}}>
                    <Text style={{flex: 1}}>
                        <Text
                            style={styles.rowTextComment}
                            numberOfLines={6}
                        >
                            {rowData.body}
                        </Text>
                        <Text style={styles.rowTextUser}>-{rowData.user.username}</Text>
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
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FF66CC',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 3,
  },
  rowTextUser: {
    color: '#000000',
    fontWeight: '200',
    backgroundColor: '#FFFFFF',
  },
  rowTextComment: {
    color: '#FFFFFF',
    fontWeight: '600',
    backgroundColor: '#000000',
  },
  rowThumbnail: {
    width: 24,
    height: 24,
    // borderRadius: 24
  },
  separator: {
    height: 0.5,
    backgroundColor: '#FFFFFF',
  },
});

function mapStateToProps(state) {
  return {
    comments: state.soundcloud,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(soundcloudActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundcloudContainer);
