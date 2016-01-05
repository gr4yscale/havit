import React from 'react-native'

let {
  Component,
  Dimensions,
  View,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  InteractionManager,
} = React

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

class CustomScrollableTabView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: this.props.initialPage,
      scrollValue: new Animated.Value(this.props.initialPage),
      container: {
        width: deviceWidth,
        height: deviceHeight,
      },
      offset: 0,
    }
  }

  componentWillReceiveProps(props) {
    if (props.initialPage !== this.state.currentPage) {
      // this.goToPage(props.initialPage)
    }
  }

  goToPage(pageNumber) {
    this.props.onChangeTab({ i: pageNumber, ref: this.props.children[pageNumber] })

    if(Platform.OS === 'ios') {
      let offset = pageNumber * this.state.container.width
      this.scrollView.scrollTo(0, offset)
    } else {
      this.scrollView.setPage(pageNumber)
    }
    this.setState({currentPage: pageNumber})
  }

  renderTabBar(props) {
    let propsWithScrollOffset = {...props, offset: this.state.offset}
    if (this.props.renderTabBar === false) {
      return null
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(), propsWithScrollOffset)
    }
    // else {
    //   return <DefaultTabBar {...props} />
    // }
  }

  renderScrollableContent() {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView
            horizontal
            pagingEnabled
            style={styles.scrollableContentIOS}
            contentOffset={{x:this.props.initialPage * this.state.container.width}}
            ref={(scrollView) => { this.scrollView = scrollView }}
            onScroll={(e) => {
              let offsetX = e.nativeEvent.contentOffset.x
              let screenWidth = e.nativeEvent.layoutMeasurement.width
              let totalWidth = e.nativeEvent.contentSize.width

              let currentPageNumber = parseInt((offsetX - 1) / screenWidth)
              let screensBefore = screenWidth * currentPageNumber
              let amountToSubtract = (totalWidth * 1.0 - (screensBefore / totalWidth))
              let percentOfCurrentScreen = (offsetX - (totalWidth - amountToSubtract)) / screenWidth

              this._updateScrollValue(percentOfCurrentScreen) // custom tabbar will use state.offset
              this.setState({offset: percentOfCurrentScreen})

              // this._updateSelectedPage(parseInt(offsetX / this.state.container.width))
            }}
            onMomentumScrollBegin={(e) => {
              let offsetX = e.nativeEvent.contentOffset.x
              this._updateSelectedPage(parseInt(offsetX / this.state.container.width))
            }}
            onMomentumScrollEnd={(e) => {
              let offsetX = e.nativeEvent.contentOffset.x
              this._updateSelectedPage(parseInt(offsetX / this.state.container.width))
            }}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={!this.props.locked}
            directionalLockEnabled
            alwaysBounceVertical={false}
        >
        {
          this.props.children.map((child,idx) => {
            return <View
                key={child.props.tabLabel + '_' + idx}
                style={{width: this.state.container.width}}
                   >
                    {child}
                  </View>
          })
        }
        </ScrollView>
      )
    } else {
      return (
        <ViewPagerAndroid
            style={styles.scrollableContentAndroid}
            initialPage={this.props.initialPage}
            onPageSelected={this._updateSelectedPage}
            onPageScroll={(e) => {
              const {offset, position} = e.nativeEvent
              this._updateScrollValue(position + offset)
            }}
            ref={(scrollView) => { this.scrollView = scrollView }}
        >
            {this.props.children.map((child,idx) => {
              return <View
                  key={child.props.tabLabel + '_' + idx}
                  style={{width: this.state.container.width}}
                     >
              {child}
          </View>
            })}
        </ViewPagerAndroid>
      )
    }
  }
  _updateSelectedPage(currentPage) {
    if (typeof currentPage === 'object') {
      currentPage = currentPage.nativeEvent.position
    }
    this.setState({currentPage}, () => {
      this.props.onChangeTab({ i: currentPage })
    })
  }

  _updateScrollValue(value) {
    this.state.scrollValue.setValue(value)
  }

  _handleLayout(e) {
    let {width, height} = e.nativeEvent.layout
    let container = this.state.container

    if (width !== container.width || height !== container.height) {
      this.setState({container: e.nativeEvent.layout})
      InteractionManager.runAfterInteractions(() => {
        this.goToPage(this.state.currentPage)
      })
    }
  }

  render() {
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this.props.children.map((child) => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      underlineColor : this.props.tabBarUnderlineColor,
      backgroundColor : this.props.tabBarBackgroundColor,
      activeTextColor : this.props.tabBarActiveTextColor,
      inactiveTextColor : this.props.tabBarInactiveTextColor,
      containerWidth: this.state.container.width,
    }

    return (
      <View
          style={[styles.container, this.props.style]}
          onLayout={this._handleLayout.bind(this)}
      >
        {this.props.tabBarPosition === 'top' ? this.renderTabBar(tabBarProps) : null}
        {this.renderScrollableContent()}
        {this.props.tabBarPosition === 'bottom' ? this.renderTabBar(tabBarProps) : null}
      </View>
    )
  }


}

CustomScrollableTabView.defaultProps = {
  tabBarPosition: 'top',
  initialPage: 0,
  onChangeTab: () => {},
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentIOS: {
    flexDirection: 'row',
  },
  scrollableContentAndroid: {
    flex: 1,
  },
})

export default CustomScrollableTabView
