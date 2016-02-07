import React from 'react-native';
import style from '../stylesheets/styles'

let {
  Component,
  View,
  TextInput,
} = React

class ShareHeader extends Component {

  componentDidMount() {
    if (this.urlInput)
      this.urlInput.setNativeProps({text: this.props.urlRedux})
    if (this.titleInput)
      this.titleInput.setNativeProps({text: this.props.titleRedux})
    if (this.commentInput)
      this.commentInput.setNativeProps({text: this.props.commentRedux})
  }

  render() {
    const { shareFormChanged } = this.props;
    return (
      <View {...style('form.container share.formContainer')}>
          <TextInput
              {...style('text.heading form.textInput share.textInput')}
              placeholder={"Write a comment..."}
              multiLine={true}
              numberOfLines={6}
              onChangeText={(txt) => shareFormChanged('comment',txt)}
              ref={(component)=>this.commentInput = component}
          />
          <TextInput
              {...style('text.heading form.textInput share.textInput')}
              placeholder={"Title"}
              onChangeText={(txt) => shareFormChanged('title',txt)}
              ref={(component)=>this.titleInput = component}
          />
          <TextInput
              {...style('text.heading form.textInput share.textInput')}
              placeholder={"URL"}
              onChangeText={(txt) => shareFormChanged('url',txt)}
              ref={(component)=>this.urlInput = component}
          />
          <View {...style('separator')} />
      </View>
    )
  }
}

export default ShareHeader
