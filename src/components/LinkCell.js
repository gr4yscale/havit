import React from 'react-native'
import Accordion from '../../node_modules/react-native-accordion'
import {Icon} from '../../node_modules/react-native-icons'

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React

export const FriendListCellActionTypeBrowser = 'FriendListCellActionTypeBrowser'
export const FriendListCellActionTypeReshare = 'FriendListCellActionTypeReshare'
export const FriendListCellActionTypePin = 'FriendListCellActionTypePin'
export const FriendListCellActionTypeUserAction1 = 'FriendListCellActionTypeUserAction1'
export const FriendListCellActionTypeUserAction2 = 'FriendListCellActionTypeUserAction2'
export const FriendListCellActionTypeUserAction3 = 'FriendListCellActionTypeUserAction3'

class LinkCell extends Component {

  handleContentPress() {
    this.props.onLinkCellTapped(this.props.rowID, this.props.data)
  }

  handleActionPress(buttonType) {
    this.props.onLinkCellAction(this.props.data, buttonType)
  }

  renderContent() {
    let statusIndicator = <Text style={{color:'#2ABFD4', paddingRight:4, fontWeight:'800'}}>●</Text>
    const {title, url} = this.props.data

    return (
          <TouchableOpacity onPress={() => this.handleContentPress()} activeOpacity={1}>
            <View style={styles.row}>
              <View style={styles.cellContent}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  {statusIndicator}
                  <View style={{flexDirection: 'column', flex: 1,marginLeft: 4}}>
                    <Text style={styles.titleText} numberOfLines={6}>
                      {title}
                    </Text>
                    <Text style={styles.urlText} numberOfLines={1}>
                      {url}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
  }

  renderBottomBar() {
    return (
          <View style={styles.cellHiddenContent}>
            <Icon
                name={'ion|ios-world-outline'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
            <Icon
                name={'ion|ios-loop'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
            <Icon
                name={'ion|pin'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
            <Icon
                name={'ion|ios-pint-outline'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
            <Icon
                name={'ion|ios-snowy'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
            <Icon
                name={'ion|ios-infinite-outline'}
                size={34}
                color={'#FFFFFF'}
                style={styles.cellHiddenContentIcons}
            />
          </View>
        )
  }
  render() {
    return (
        <Accordion
            header={this.renderContent()}
            content={this.renderBottomBar()}
            easing="easeOutCubic"
            underlayColor="rgba(0,0,0,0)"
            animationDuration={100}
        />
      )
  }
}

let styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    // marginBottom: 0.5,
    // marginTop: 1,
    // opacity: 0.8,
    // backgroundColor: '#FFFFFF',
  },
  cellContent: {
    flex: 1,
    // marginTop: 2,
    // marginLeft: 1,
    // marginRight: 1,
    marginTop: 0.5,
    padding: 18,
    backgroundColor: '#FFFFFF',

  },
  cellHiddenContent: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellHiddenContentIcons: {
    flex: 1,
    // backgroundColor:'#ff8822',
    width: 40,
    height: 40,
    padding: 4,
  },
  titleText: {
    color: '#000000',
    fontWeight: '600',
  },
  urlText: {
    color: '#666666',
    fontWeight: '200',
  },
})

export default LinkCell
