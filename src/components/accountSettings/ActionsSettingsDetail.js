import React from 'react-native'
import style, {COLOR_5, COLOR_3} from '../../stylesheets/styles'

let {
  Component,
  View,
  TextInput,
  Switch,
  Text,
} = React

class AccountSettingsDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      switchValue: true,
    }
  }

  render() {
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 2}}>
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3}])}
                placeholder={"Action Name"}
                returnKeyType="next"
            />
            <TextInput
                {...style('text.heading form.textInput', [{flex: 0, backgroundColor:COLOR_3}])}
                placeholder={"IFTTT URL"}
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

export default AccountSettingsDetail
