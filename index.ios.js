import React from 'react'
import Root from './src/root'
import RootShareApp from './src/rootShareApp'

const {
  AppRegistry,
} = React

AppRegistry.registerComponent('HavitApp', () => Root)
AppRegistry.registerComponent('HavitShareApp', () => RootShareApp)
