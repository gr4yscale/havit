import React, {Component, PropTypes} from 'react'
import {View} from 'react-native';

import style from '../stylesheets/styles'

// TOFIX: container is positioned relative (flexbox), but contained views are positioned absolute
// this is so that the shadow can sit behind the content view
// as a result, we must provide width and height which are big enough to handle any margins that
// the container may receive

class HVTCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contentWidth: 0,
      contentHeight: 0,
    }
  }

  // handleContentLayout(event) {
  //   this.setState({
  //     contentWidth: event.nativeEvent.layout.width,
  //     contentHeight: event.nativeEvent.layout.height,
  //   })
  //
  //   console.log(this.state)
  // }
  // render() {
  //   return (
  //     <View {...style('container', [this.props.extraStyle])}>
  //       <View {...style('card.shadow', [{width: this.state.contentWidth, height: this.state.contentHeight}])} />
  //       <View {...style('card.content')} onLayout={this.handleContentLayout.bind(this)}>
  //         {this.props.children}
  //       </View>
  //     </View>
  //   )
  // }


  render() {
    return (
      <View {...style('container', [this.props.extraStyle])}>
        <View {...style('card.content')}>
          {this.props.children}
        </View>
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
