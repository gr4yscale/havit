import React from 'react-native';

let {
  Component,
  StyleSheet,
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
      <View style={styles.form}>
      <TextInput
          style={styles.inputs}
          placeholder={"URL"}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(txt) => shareFormChanged('url',txt)}
          ref={(component)=>this.urlInput = component}
      />
      <TextInput
          style={styles.inputs}
          placeholder={"Title"}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(txt) => shareFormChanged('title',txt)}
          ref={(component)=>this.titleInput = component}
      />
      <TextInput
          style={styles.inputs}
          placeholder={"Comment"}
          autoCapitalize={'none'}
          multiLine={true}
          numberOfLines={6}
          onChangeText={(txt) => shareFormChanged('comment',txt)}
          ref={(component)=>this.commentInput = component}
      />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  form: {
    backgroundColor:'transparent',
    marginTop: 4,
    marginBottom: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  inputs: {
    flex:1,
    fontSize:13,
    borderColor: '#BBBBBB',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 0,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 14,
    marginBottom: 0,
  },
})

export default ShareHeader
