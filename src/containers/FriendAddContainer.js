import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
// import {Actions} from '../../node_modules/react-native-router-flux'
import _ from 'lodash'
import FriendAddCell from '../components/FriendAddCell'
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5} from '../stylesheets/styles'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  ListView,
  TextInput,
  Alert,
} = React

let deviceHeight = Dimensions.get('window').height;

class FriendAddContainer extends Component {

  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.objectId !== r2.objectId,
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      userFound: false,
    }
  }

  componentDidMount() {
    const {getAllUsers} = this.props
    getAllUsers()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.userFound != this.state.userFound ||
      nextProps.friends != this.props.friends
  }

  dispatchAddFriendAndClearSearchInput() {
    const {addFriend, fetchFriends} = this.props
    addFriend(this.emailTextEntered)
    .then(() => {
      if (this.textInput) {
        this.textInput.clear()
        this.setState({userFound: false})
      }
      fetchFriends()
    })
  }

  addButtonPressed() {
    this.dispatchAddFriendAndClearSearchInput()
  }

  handleTextEntered() {
    this.dispatchAddFriendAndClearSearchInput()
  }

  handleOnChangeText(text) {
    this.emailTextEntered = text
    let user = _.find(this.props.users, {email: text})
    this.setState({userFound: (user ? true : false)})
  }

  renderSearchForm(buttonBackgroundColor) {
    return (
        <View style={styles.searchFormContainer}>
          <TextInput
              style={[styles.inputs, {flex: 1,backgroundColor:COLOR_4}]}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={() => this.handleTextEntered()}
              onChangeText={(text) => this.handleOnChangeText(text)}
              ref={(component)=> this.textInput = component}
          />
          <TouchableHighlight
              style={[styles.button, {backgroundColor: buttonBackgroundColor}]}
              underlayColor="#99d9f4"
              onPress={() => this.addButtonPressed()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
    )
  }

  render() {
    let backgroundColor = this.state.userFound ?  COLOR_3 : COLOR_1
    let buttonBackgroundColor = this.state.userFound ?  COLOR_1 : COLOR_3

    let dataSource = this.props.friends ? this.state.dataSource.cloneWithRows(this.props.friends) : this.state.dataSource.cloneWithRows([])

    return (
      <View style={[styles.container, {backgroundColor}]}>
        <Text style={styles.bigText}>{`Enter a friend's email address to add them:`}</Text>
        <View>
          {this.renderSearchForm(buttonBackgroundColor)}
        </View>
        <View style={{flex: 1}}>
        <ListView
            dataSource = {dataSource}
            renderRow = {(data) => {
              return (
                <FriendAddCell
                    text={data.displayName}
                    onPress={() => {Alert.alert('Not implemented', `Sorry, you can't remove friends right now`)}}
                />
              )
            }}
            initialListSize={20}
            pageSize={4}
            style = {styles.listView}
        />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    height:deviceHeight - 62, // - 62 when custom navbar is show
  },
  searchFormContainer: {
    flex: 1,
    flexDirection: 'row',
    padding:8,
  },
  inputs: {
    height: 40,
    borderWidth: 0,
    padding: 8,
    color:COLOR_1,
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 20,
    // fontWeight: '600',
  },
  buttonText: {
    fontSize: 18,
    color: COLOR_2,
    alignSelf: 'center',
    fontFamily:'AvenirNext-Medium',
    fontWeight: '400',
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: COLOR_3,
    justifyContent: 'center',

  },
  listView: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 0,
  },
  bigText: {
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 20,
    fontWeight: '600',
    color:COLOR_4,
    padding: 8,
    paddingBottom: 0,
  },
})

export default connect(
  (state) => {
    return {
      friends: state.entities.friends,
      users: state.entities.users,
    }
  },
  (dispatch) => {
    return bindActionCreators(serverActions, dispatch);
  }
)(FriendAddContainer)
