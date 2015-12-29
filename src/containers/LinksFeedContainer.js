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
} = React

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
    const { fetchLinksReceived } = this.props
    setTimeout(function() {
      fetchLinksReceived()
    }, 200);
  }

  linkCellTapped(rowId) {
    console.log(`tapped ${rowId}`)
  }

  render() {
    console.log(this.props.links);
    let dataSource = this.props.links ? this.state.dataSource.cloneWithRows(this.props.links) : this.state.dataSource.cloneWithRows([])

    return (
      <View style={styles.container}>
        <ListView
            dataSource = {dataSource}
            renderRow = {(rowData, sectionId, rowId) => {
              return (
              <TouchableOpacity onPress={this.linkCellTapped.bind(this, parseInt(rowId))}>
              <View style={styles.row}>
                <View style={{flexDirection: 'column', flex: 1, alignItems: 'flex-start'}}>
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
    backgroundColor: '#88BBFF',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    // marginLeft:4,
    // marginRight:4,
    marginTop: 1,
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

function mapStateToProps(state) {
  return {
    links: state.entities.links,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksFeedContainer)
