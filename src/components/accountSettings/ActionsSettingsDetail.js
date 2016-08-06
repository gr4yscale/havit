import React, {Component} from 'react'
import {
  View,
  TextInput,
  Switch,
  Text,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as accountSettingsActions from '../../redux/actions/accountSettingsActions'
import style, {COLOR_5, COLOR_3, COLOR_4} from '../../stylesheets/styles'

class ActionsSettingsDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      switchValue: true,
    }
  }

  render() {
    const {ifttActionFieldChanged} = this.props
    let index = this.props.selectedActionIndex
    let action = this.props.iftttActions[index]

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 2}}>
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3, color: COLOR_4}])}
                onChangeText={(value) => ifttActionFieldChanged({field: 'alias', value})}
                placeholder={"Action Name"}
                returnKeyType="next"
                autoCapitalize={'words'}
                value={action.alias}
            />
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3, color: COLOR_4}])}
                onChangeText={(value) => ifttActionFieldChanged({field: 'url', value})}
                placeholder={"IFTTT URL"}
                autoCapitalize={'words'}
                returnKeyType="next"
                value={action.url}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 6}}>
            <View style={{flex : 1, justifyContent: 'center'}}>
              <Text {...style('text', [{color: COLOR_5}])} numberOfLines={4}>
                Trigger this action when someone shares to me
              </Text>
            </View>
            <Switch
                onValueChange={(value) => ifttActionFieldChanged({field: 'triggerOnShareReceive', value})}
                style={{marginTop: 10, marginBottom: 0, marginLeft: 0, marginRight: 8, width: 48}}
                value={action.triggerOnShareReceive}
            />
          </View>

          <View style={{flex: 0, flexDirection: 'row'}}>
            <View style={{flex : 1, justifyContent: 'center'}}>
              <Text {...style('text', [{color: COLOR_5}])}>
                Enabled on Inbox
              </Text>
            </View>
            <Switch
                onValueChange={(value) => ifttActionFieldChanged({field: 'enabledOnInbox', value})}
                style={{marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 8, width: 48}}
                value={action.enabledOnInbox}
            />
          </View>

          <View style={{flex: 0, backgroundColor: 'red'}} />
        </View>

    )
  }
}

export default connect(
  (state) => {
    return state.accountSettings
  },
  (dispatch) => {
    return {
      ...bindActionCreators(accountSettingsActions, dispatch),
    }
  }
)(ActionsSettingsDetail)
