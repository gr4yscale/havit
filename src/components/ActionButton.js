import React from 'react-native'
import style from '../stylesheets/styles'

let {
  Component,
  View,
  TouchableOpacity,
  Text,
} = React


class ActionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonWidth: 0,
      buttonHeight: 0,
    }
  }
  render() {
    let actionButtonCircleBackgroundStyle = {top: this.state.buttonHeight / 2 - (38 / 2),
                                             left: this.state.buttonWidth / 2 - (38 / 2),
                                             width: 38,
                                             height: 38,
                                             backgroundColor:this.props.backgroundColor}
    return (
      <TouchableOpacity
          {...style('actionButtonContainer')}
          onPress={() => this.props.onPress()}
          onLayout={(event) =>{
            this.setState({
              buttonWidth: event.nativeEvent.layout.width,
              buttonHeight: event.nativeEvent.layout.height,
            })
          }}
      >
        <View {...style('actionButtonCircleBackground', [actionButtonCircleBackgroundStyle])} />
        <Text {...style('buttonText.text actionButtonText')}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default ActionButton
