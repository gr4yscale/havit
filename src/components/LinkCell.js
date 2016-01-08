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
    this.accordion.toggle()
  }

  handleActionPress(buttonType) {
    this.props.onLinkCellAction(this.props.data, buttonType)
  }

  close() {
    this.accordion.close()
  }

  renderContent() {
    let statusIndicator = <Text style={{color:'#2ABFD4', paddingRight:4, fontWeight:'800'}}>●</Text>
    const {title, url} = this.props.data

    return (
          <TouchableOpacity onPress={() => this.handleContentPress()} activeOpacity={1}>
            <View style={styles.row}>
              <View style={styles.content}>
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
          <View style={styles.hidden}>
            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeBrowser)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-world-outline'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeReshare)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-loop'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypePin)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|pin'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction1)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-pint-outline'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction2)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-snowy'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction3)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-infinite-outline'}
                  size={40}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>
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
            ref={(accordion) => this.accordion = accordion}
        />
      )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // marginBottom: 0.5,
    // marginTop: 1,
    // opacity: 0.8,
    // backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    // marginTop: 2,
    // marginLeft: 1,
    // marginRight: 1,
    marginTop: 0.5,
    padding: 18,
    backgroundColor: '#FFFFFF',

  },
  hidden: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  icons: {
    flex: 1,
    // backgroundColor:'#ff8822',
    width: 40,
    height: 40,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
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
