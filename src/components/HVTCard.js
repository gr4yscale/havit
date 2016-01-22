import React from 'react-native'
import style from '../stylesheets/styles'


let {
  Component,
  View,
  PropTypes,
} = React

// TOFIX: container is positioned relative (flexbox), but contained views are positioned absolute
// this is so that the shadow can sit behind the content view
// as a result, we must provide width and height which are big enough to handle any margins that
// the container may receive

class HVTCard extends Component {

  render() {
    return (
      <View {...style('container', [this.props.extraStyle])}>
        <View {...style('card.shadow', [{width: this.props.width, height: this.props.height}])} />
        <View {...style('card.content', [{width: this.props.width, height: this.props.height}])} />
        {this.props.children}
      </View>
    )
  }
}

HVTCard.PropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  extraStyle: PropTypes.number,
}

export default HVTCard
