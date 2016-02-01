'use strict'

import * as actionTypes from '../actionTypes'
import {authModeSignIn, authModeSignUp} from '../actions/authActions'


// TOFIX: remove unecessary fields key?
const initialState = {
  signInForm: {
    username: '',
    email: '',
    password: '',
  },
  signUpForm: {
    displayName: '',
    username: '',
    email: '',
    password: '',
  },
  authMode: '',
}

// TOFIX: no need for ...state
export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SIGN_IN_FORM_CHANGED': {
      let { field, value } = action.payload
      let updatedField = {}
      updatedField[field] = value
      let updatedForm = Object.assign({}, state.signInForm, updatedField)
      return Object.assign({}, state, {
        ...{signInForm: updatedForm},
      })
    }
    case 'AUTH_SIGN_UP_FORM_CHANGED': {
      let { field, value } = action.payload
      let updatedField = {}
      updatedField[field] = value
      let updatedForm = Object.assign({}, state.signUpForm, updatedField)
      return Object.assign({}, state, {
        ...{signUpForm: updatedForm},
      })
    }
    case actionTypes.LOGIN_FAILURE:
      return state;

    case 'AUTH_MODE_SWITCH_TO_SIGN_IN':
      return Object.assign({}, state, {
        authMode: authModeSignIn,
      })

    case 'AUTH_MODE_SWITCH_TO_SIGN_UP':
      return Object.assign({}, state, {
        authMode: authModeSignUp,
      })

    case 'AUTH_MODE_RESET':
      return initialState

    case 'AUTH_LOGOUT':
      return Object.assign({}, initialState)

    default:
      return state;
  }
}
