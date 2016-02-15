import React from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as serverActions from '../redux/actions/serverActions'
import * as authActions from '../redux/actions/authActions'
import * as accountSettingsActions from '../redux/actions/accountSettingsActions'
import {Actions} from '../../node_modules/react-native-router-flux'
import ActionsSettingsList from '../components/accountSettings/ActionsSettingsList'
import style, {COLOR_2, COLOR_3, COLOR_4, COLOR_5} from '../stylesheets/styles'
import ProgressView from '../components/ProgressView'
import HVTButton from '../components/HVTButton'

let {
  Component,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Switch,
  Text,
} = React

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class AccountSettingsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      container: {
        width: deviceWidth,
        height: deviceHeight,
      },
    }
  }

  render() {
    const {accountSettingsFieldChanged} = this.props
    return (
      <ScrollView {...style('container', [{padding: 20}])}>
        <View style={{flex: 1, marginBottom: 240}}>

          <View style={{backgroundColor: COLOR_4}}>
            <Text {...style('text text.huge', [{color: COLOR_3, textAlign:'center'}])}>
              Account Settings
            </Text>
          </View>

          <TextInput
              {...style('text.heading form.textInput', [{backgroundColor:COLOR_3, marginLeft: 0, marginRight: 0, marginBottom: 0}])}
              placeholder={"Display Name"}
              ref={(component) => this.textInputDisplayName = component}
              returnKeyType="next"
              onChangeText={(value) => accountSettingsFieldChanged({field: 'displayName', value})}
              onKeyPress={(event) => {
                if (event.nativeEvent.key === 'Enter') {
                  this.textInputDisplayName.blur()
                }
              }}
              value={this.props.displayName}
          />

          <View style={{flex: 1, marginTop: 8, marginBottom: 8, flexDirection: 'row'}}>
            <View style={{flex : 1, justifyContent: 'center'}}>
              <Text {...style('text', [{color: COLOR_5, padding: 0, margin: 0, paddingTop: 8, paddingBottom: 8}])} numberOfLines={2}>
                Get an email when someone shares to me
              </Text>
            </View>
            <Switch
                style={{marginLeft: 0, width: 48}}
                value={true}
            />
          </View>

          <Text {...style('text', [{color: COLOR_2, margin: 0, padding:0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 0, textAlign:'center'}])}>-</Text>

          <Text {...style('text', [{color: COLOR_2, margin: 0, marginLeft: 0, marginRight: 0, marginBottom: 8, marginTop: 6}])} numberOfLines={6}>
            {`Using the IFTTT Maker API you can integrate a number of services by cloning our example recipe *here* and pasting the URL back into the 'IFTTT URL' field. Hint: you can use emoji 📌📷👻🌮⛱🎉 to make custom buttons!`}
          </Text>

          <View style={{backgroundColor: COLOR_4, marginTop: 8, marginBottom: 8}}>
            <Text {...style('text text.huge', [{color: COLOR_3, textAlign:'center'}])}>
              IFTTT Actions
            </Text>
          </View>

          <ActionsSettingsList />

          <HVTButton
              text={"Update Account"}
              onPress={() => {
                this.props.updateCurrentUser()
              }}
              extraTouchableStyle={{marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}
          />

          <HVTButton
              text={"Log Out"}
              onPress={() => {
                this.props.logout()
                Actions.Intro()
              }}
              extraTouchableStyle={{marginTop: 2, marginBottom: 10, marginLeft: 10, marginRight: 10}}
              extraTextWrapperStyle={{backgroundColor: COLOR_3}}
              extraTextStyle={{color: COLOR_2}}
          />

        </View>
      </ScrollView>

    )
  }
}

export default connect(
  (state) => {
    return state.accountSettings
  },
  (dispatch) => {
    return {
      ...bindActionCreators(serverActions, dispatch),
      ...bindActionCreators(authActions, dispatch),
      ...bindActionCreators(accountSettingsActions, dispatch),
    }
  }
)(AccountSettingsContainer)
