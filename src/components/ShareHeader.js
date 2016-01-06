import React from 'react-native';

let {
  Component,
  StyleSheet,
  View,
  TextInput,
} = React

class ShareHeader extends Component {
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
          value={this.props.url}
      />
      <TextInput
          style={styles.inputs}
          placeholder={"Title"}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(txt) => shareFormChanged('title',txt)}
          value={this.props.title}
      />
      <TextInput
          style={styles.inputs}
          placeholder={"Comment"}
          autoCapitalize={'none'}
          multiLine={true}
          numberOfLines={6}
          onChangeText={(txt) => shareFormChanged('comment',txt)}
      />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  form: {
    backgroundColor:'#EEEEEE',
    marginTop: 4,
    marginBottom: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  inputs: {
    flex:1,
    height: 30,
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
