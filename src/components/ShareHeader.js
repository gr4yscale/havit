import React from 'react-native';
import style, { COLOR_1, COLOR_5, FONT_SIZE_TITLE } from '../stylesheets/styles'
import HVTCard from './HVTCard'

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
      <View style={styles.formContainer}>
        <HVTCard
            extraStyle={styles.container}
        >
          <TextInput
              {...style('text.heading', [styles.inputs])}
              placeholder={"URL"}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={COLOR_1}
              onChangeText={(txt) => shareFormChanged('url',txt)}
              ref={(component)=>this.urlInput = component}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              placeholder={"Title"}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={COLOR_1}
              onChangeText={(txt) => shareFormChanged('title',txt)}
              ref={(component)=>this.titleInput = component}
          />
          <TextInput
              {...style('text.heading', [styles.inputs])}
              placeholder={"Comment"}
              autoCapitalize={'none'}
              multiLine={true}
              numberOfLines={6}
              placeholderTextColor={COLOR_1}
              onChangeText={(txt) => shareFormChanged('comment',txt)}
              ref={(component)=>this.commentInput = component}
          />
        </HVTCard>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  formCard: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 3,
  },
  inputs: {
    height: 40,
    borderBottomColor: COLOR_5,
    borderBottomWidth: 1,
    marginLeft: 10,
    padding: 8,
    color: COLOR_1,
    fontSize: FONT_SIZE_TITLE,
  },
})

export default ShareHeader
