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
          placeholder={"URL"}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
      />
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
    backgroundColor:'#EEEEEE',
    marginTop: 4,
    marginBottom: 8,
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
    marginTop: 4,
    marginBottom: 0,
  },
})

export default ShareHeader
