import { StyleSheet } from 'react-native'
// import StyleSheet from '../stylesheets/debugStylesheet.js'
import cairn from '../../node_modules/cairn'

export const COLOR_1 = '#FFFFFF'
export const COLOR_2 = '#000000'
export const COLOR_3 = '#FF3B7F'
export const COLOR_4 = '#444444'
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
      fontSize: FONT_SIZE_HEADING,
      fontWeight: FONT_WEIGHT_HEADING,
      textAlign: 'center',
    },

    textWrapper: {
      backgroundColor:COLOR_2,
      borderRadius: 20,
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

  card: {
    content: {
      backgroundColor:COLOR_1,
      marginRight: 4,
      marginBottom: 4,
    },

    shadow: {
      position:'absolute',
      backgroundColor:COLOR_2,
      marginLeft: 4,
      marginTop: 4,
      opacity: 0.3,
    },
  },


}, (styles) => StyleSheet.create(styles))
