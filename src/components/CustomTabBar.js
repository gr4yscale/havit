import {Icon} from '../../node_modules/react-native-icons'
import React from 'react-native';

let {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React

class CustomTabBar extends Component {
  constructor(props) {
    super(props);
  }

  handleNavIconPress() {
    this.props.onNavIconPress()
  }

  render() {
    return (
      <View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => this.handleNavIconPress()} activeOpacity={1}>
            <Icon
                name={'ion|navicon'}
                size={30}
                color={'#FFFFFF'}
                style={styles.navIcon}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Havit!</Text>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 62,
    flexDirection: 'row',
    paddingTop: 16,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor:'#2ABFD4',
  },
  titleText: {
    height: 32,
    // backgroundColor:'#ff00ff',
    marginLeft: 4,
    marginTop: 8,
    color: '#FFFFFF',
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 24,
  },
  navIcon: {
    marginTop: 8,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
})

export default CustomTabBar;
