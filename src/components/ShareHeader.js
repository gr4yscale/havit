import React from 'react-native';

let {
  Component,
  StyleSheet,
  View,
  TextInput,
} = React

class ShareHeader extends Component {
  render() {
    return (
      <View style={styles.form}>
      <TextInput
          style={styles.inputs}
          placeholder={"Title"}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
      />
      <TextInput
          style={styles.inputs}
          placeholder={"Comment"}
          autoCapitalize={'none'}
          multiLine={true}
          numberOfLines={6}
          autoCorrect={false}
      />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  form: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputs: {
    flex:1,
    height: 32,
    fontSize:14,
    borderColor: '#BBBBBB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginTop: 4,
    marginBottom: 4,
  },
})

export default ShareHeader
