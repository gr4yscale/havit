import React from 'react-native'
import Accordion from '../../node_modules/react-native-accordion'
import {Icon} from '../../node_modules/react-native-icons'

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
    const {title, url} = this.props.data

    let backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF','#444444'],
    })

    let textColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000','#FFFFFF'],
    })

    let secondaryTextColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#666666','#FFFFFF'],
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
                        @gr4yscale
                      </Animated.Text>
                    </View>
              </Animated.View>
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
                  name={'ion|ios-snowy'}
                  size={32}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeReshare)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-snowy'}
                  size={32}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypePin)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-snowy'}
                  size={32}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction1)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-snowy'}
                  size={32}
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
                  size={32}
                  color={'#FFFFFF'}
                  style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.handleActionPress(FriendListCellActionTypeUserAction3)}
                style={styles.iconWrapper}
            >
              <Icon
                  name={'ion|ios-snowy'}
                  size={32}
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
    padding: 14,
    paddingTop: 16,
    paddingBottom: 16,
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
    height: 54,
    backgroundColor: '#777777',
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
    color: '#FFFFFF',
  },
  titleText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 4,
  },
  urlText: {
    color: '#666666',
    fontWeight: '200',
    fontSize: 12,
    paddingTop: 4,
  },
  statusIndicator: {
    color:'#2ABFD4',
    paddingRight:4,
    fontWeight:'800',
  },
})

export default LinkCell