import React from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import * as accountSettingsActions from '../../redux/actions/accountSettingsActions'
import style, {COLOR_5, COLOR_3} from '../../stylesheets/styles'

let {
  Component,
  View,
  TextInput,
  Switch,
  Text,
} = React

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
    let alias = this.props.iftttActions[index].alias

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 2}}>
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3}])}
                onChangeText={(value) => ifttActionFieldChanged({field: 'alias', value})}
                autoFocus={true}
                placeholder={"Action Name"}
                returnKeyType="next"
                autoCapitalize={'characters'}
                value={alias}
            />
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3}])}
                onChangeText={(value) => ifttActionFieldChanged({field: 'actionUrl', value})}
                placeholder={"IFTTT URL"}
                autoCapitalize={'characters'}
                returnKeyType="next"
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex : 1, justifyContent: 'center'}}>
              <Text {...style('text', [{color: COLOR_5}])} numberOfLines={4}>
                Trigger this action when someone shares to me
              </Text>
            </View>
            <Switch
                onValueChange={(value) => this.setState({switchValue: value})}
                style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 8, width: 48}}
                value={this.state.switchValue}
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
