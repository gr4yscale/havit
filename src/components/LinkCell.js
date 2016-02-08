import React from 'react-native'
import Accordion from '../../node_modules/react-native-accordion'
import {Icon} from '../../node_modules/react-native-icons'
import style, { COLOR_1, COLOR_2, COLOR_4, COLOR_5 } from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} = React

export const FriendListCellActionTypeBrowser = 'FriendListCellActionTypeBrowser'
export const FriendListCellActionTypeReshare = 'FriendListCellActionTypeReshare'
export const FriendListCellActionTypePin = 'FriendListCellActionTypePin'
export const FriendListCellActionTypeUserAction1 = 'FriendListCellActionTypeUserAction1'
export const FriendListCellActionTypeUserAction2 = 'FriendListCellActionTypeUserAction2'
export const FriendListCellActionTypeUserAction3 = 'FriendListCellActionTypeUserAction3'

class LinkCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: new Animated.Value(0),
    }
    this.isOpen = false
  }

  handleContentPress() {
    this.props.onLinkCellTapped(this.props.rowID, this.props.data)
    if (this.isOpen)
      this.close()
    else
      this.open()
    this.isOpen = !this.isOpen
  }

  handleActionPress(buttonType) {
    this.props.onLinkCellAction(this.props.data, buttonType)
  }

  close() {
    this.accordion.close()
    Animated.timing(
      this.state.backgroundColor,
      {
        toValue: 0,
        easing: Easing.easeOutCubic,
        duration: 250,
      },
    ).start()
  }

  open() {
    this.accordion.open()
    Animated.timing(
      this.state.backgroundColor,
      {
        toValue: 1,
        easing: Easing.easeOutCubic,
        duration: 250,
      },
    ).start()
  }

  renderContent() {
    let statusIndicator = <Text style={styles.statusIndicator}>●</Text>
    // let friend = this.props.friend ?
    const {title, url, senderDisplayName} = this.props.data

    let backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR_1, COLOR_4],
    })

    let textColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR_2, COLOR_1],
    })

    let secondaryTextColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR_5, COLOR_1],
    })

    return (
          <TouchableOpacity onPress={() => this.handleContentPress()} activeOpacity={1}>
              <Animated.View style={[styles.contentWrapper,{backgroundColor}]}>
                    {statusIndicator}
                    <View style={styles.contentText}>
                      <Animated.Text style={[styles.titleText, {color:textColor}]} numberOfLines={6}>
                        {title}
                      </Animated.Text>
                      <Animated.Text style={[styles.urlText, {color:secondaryTextColor}]} numberOfLines={1}>
                        {url}
                      </Animated.Text>
                      <Animated.Text style={[styles.senderNameText, {color:secondaryTextColor}]} numberOfLines={1}>
                        {senderDisplayName}
                      </Animated.Text>
                    </View>
              </Animated.View>
              <View {...style('separator')} />
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
                  name={'ion|earth'}
                  size={32}
                  color={COLOR_1}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeReshare)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|android-share'}
                  size={32}
                  color={COLOR_1}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypePin)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|android-plane'}
                  size={32}
                  color={COLOR_1}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction1)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|android-restaurant'}
                  size={32}
                  color={COLOR_1}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction2)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|android-bar'}
                  size={32}
                  color={COLOR_1}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction3)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|android-cart'}
                  size={32}
                  color={COLOR_1}
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
          animationDuration={250}
          ref={(accordion) => this.accordion = accordion}
      />
      )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 4,
  },
  hidden: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    backgroundColor: COLOR_5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  icons: {
    flex: 1,
    width: 32,
    height: 32,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  senderNameText: {
    fontWeight: '300',
    fontSize: 12,
    paddingTop: 4,
    color: COLOR_1,
  },
  titleText: {
    color: COLOR_2,
    fontWeight: '600',
    fontSize: 18,
    marginTop: 4,
  },
  urlText: {
    color: COLOR_5,
    fontWeight: '200',
    fontSize: 12,
    paddingTop: 4,
  },
  statusIndicator: {
    color:COLOR_5,
    paddingRight:4,
    fontWeight:'800',
  },
})

export default LinkCell
