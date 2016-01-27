import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
// import StyleSheet from '../stylesheets/debugStylesheet.js'
import cairn from '../../node_modules/cairn'

const deviceWidth = Dimensions.get('window').width;

export const COLOR_1 = '#FFFFFF'
export const COLOR_2 = '#000000'
export const COLOR_3 = '#33FFBB'
export const COLOR_4 = '#282C34'
export const COLOR_5 = '#666666'
export const FONT_FAMILY = 'AvenirNext-Medium'
export const FONT_SIZE_HUGE = 24
export const FONT_SIZE_HEADING = 18
export const FONT_SIZE_TITLE = 14
export const FONT_SIZE_SUBTITLE = 12
export const FONT_WEIGHT_HUGE = '600'
export const FONT_WEIGHT_HEADING = '400'
export const FONT_WEIGHT_TITLE = '300'
export const FONT_WEIGHT_SUBTITLE = '200'

export default cairn({
  container: {
    flex:1,
  },

  text: {
    fontFamily: FONT_FAMILY,
    color: COLOR_1,
    margin: 8,

    huge: {
      fontSize: FONT_SIZE_HUGE,
      fontWeight: FONT_WEIGHT_HUGE,
    },

    heading: {
      fontSize: FONT_SIZE_HEADING,
      fontWeight: FONT_WEIGHT_HEADING,
    },

    title: {
      fontSize: FONT_SIZE_TITLE,
      fontWeight: FONT_WEIGHT_TITLE,
    },

    subtitle: {
      fontSize: FONT_SIZE_SUBTITLE,
      fontWeight: FONT_WEIGHT_SUBTITLE,
    },
  },

  textInput: {
    position:'absolute',
    margin: 0,

    input: {
      padding: 8,
      color: COLOR_2,
      backgroundColor: COLOR_1,
    },
    shadow: {
      backgroundColor:COLOR_2,
      marginLeft: 4,
      marginTop: 4,
      opacity: 0.3,
    },
    flatInput: {
      padding: 8,
      color: COLOR_2,
    },
  },

  buttonText: {
    touchable: {
      backgroundColor:'transparent',
      justifyContent: 'center',
      props: {
        underlayColor: COLOR_3,
      },
    },
    text: {
      margin: 10,
      color: COLOR_1,
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE_HUGE,
      fontWeight: FONT_WEIGHT_HEADING,
      textAlign: 'center',
    },
    textWrapper: {
      backgroundColor:COLOR_2,
      height: 48,
      borderRadius: 24,
      justifyContent:'center',
    },
  },

  buttonIcon: {
    props:{},
    icon: {
      position:'absolute',
      left: 0,
      top: 0,
      backgroundColor:'transparent',
    },
  },

  buttonBottomBar: {
    container: {
      position:'absolute',
      width:deviceWidth,
      height: 50,
      bottom: 0,
    },
    touchable: {
      height: 50,
      backgroundColor: COLOR_4,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    touchableValid: {
      backgroundColor: COLOR_3,
    },
    touchableInvalid: {
      backgroundColor: COLOR_4,
    },
    text: {
      color: COLOR_3,
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE_HUGE,
      fontWeight: FONT_WEIGHT_HEADING,
      textAlign: 'center',
      justifyContent:'center',
    },
    textValid: {
      color: COLOR_4,
      fontWeight: FONT_WEIGHT_HUGE,
    },
    textInvalid: {
      color: COLOR_3,
    },
  },

  card: {
    content: {
      backgroundColor:COLOR_4,
      marginRight: 6,
      marginBottom: 6,
    },
    shadow: {
      position:'absolute',
      backgroundColor:COLOR_2,
      marginLeft: 6,
      marginTop: 6,
      opacity: 0,
    },
  },

  // closeIcon: {
  //   position:'absolute',
  //   left: 0,
  //   top: 0,
  //   width: 30,
  //   height: 30,
  // },

}, (styles) => StyleSheet.create(styles))
