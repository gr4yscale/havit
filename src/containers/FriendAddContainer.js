import React from 'react-native';
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
// import {Actions} from '../../node_modules/react-native-router-flux'
import _ from 'lodash'
import FriendAddCell from '../components/FriendAddCell'

let {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  ListView,
  TextInput
} = React

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class FriendAddContainer extends Component {

  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(['yo', 'yo yo yo yo', 'yo again', 'more yo', 'yo ho ho']),
    }
    //dispatch fetching cache of all users
  }

  componentDidMount() {
    const {getAllUsers} = this.props
    getAllUsers()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.userFound != this.state.userFound
  }

  dispatchAddFriend() {
    const {addFriend} = this.props
    addFriend(this.emailTextEntered)
    .then(() => console.log('friend added'))
  }
  addButtonPressed() {
    this.dispatchAddFriend()
  }

  // TOFIX: is this really the best way to handle this?
  handleTextEntered(event) {
    let text = event.nativeEvent.text
    this.dispatchAddFriend()

    if (this.textInput) {
      this.textInput.setNativeProps({text: ''})
    }
  }

  renderSearchForm() {
    return (
        <View style={styles.searchFormContainer}>
          <TextInput
              style={[styles.inputs, {flex: 1,backgroundColor:'#9944ff'}]}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={(event) => this.handleTextEntered(event)}
              onChangeText={(text) => this.handleOnChangeText(text)}
              ref={(component)=> this.textInput = component}
          />
          <TouchableHighlight
              style={styles.button}
              underlayColor="#99d9f4"
              onPress={() => this.addButtonPressed()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{`Enter a friend's email address to add them:`}</Text>
        <View style={[{backgroundColor:'#5511ff'}]}>
          {this.renderSearchForm()}
        </View>
        <View style={{flex: 1,backgroundColor:'#9900ff'}}>
        <ListView
            dataSource = {this.state.dataSource}
            renderRow = {(data) => {
              return (
                <FriendAddCell
                    text={data}
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
    backgroundColor:'#FF3B00',
    height:deviceHeight - 62, // - 62 when custom navbar is show
  },
  searchFormContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'#ff00ff',
    padding:8,
  },
  inputs: {
    height: 40,
    borderWidth: 0,
    padding: 8,
    color:'#FFFFFF',
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 20,
    // fontWeight: '600',
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center',
    fontFamily:'AvenirNext-Medium',
    fontWeight: '400',
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',

  },
  listView: {
    backgroundColor: 'rgba(0,1,0,0)',
    paddingTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  bigText: {
    fontFamily:'AvenirNext-Medium', // http://iosfonts.com/
    fontSize: 20,
    fontWeight: '600',
    color:'#FFFFFF',
    backgroundColor: '#003377',
    padding: 8,
  },
})

export default connect(
  (state) => {
    return {
      users: state.entities.users,
    }
  },
  (dispatch) => {
    return bindActionCreators(serverActions, dispatch);
  }
)(FriendAddContainer)
