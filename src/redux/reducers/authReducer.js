'use strict'

import * as actionTypes from '../actionTypes'
import {authModeSignIn, authModeSignUp} from '../actions/authActions'


// TOFIX: remove unecessary fields key?
const initialState = {
  form: {
    fields: {
      username: '',
      email: '',
      password: '',
    },
  },
  signup: {
    stepTick: 0,
    promptText: 'What is your name?',
    fields: {
      displayName: '',
      username: '',
      email: '',
      password: '',
    },
    finished: false,
  },
  authMode: '',
}

function loginFormFields(state = initialState, payload) {
  let { field, value } = payload
  let updatedField = {}
  updatedField[field] = value
  return Object.assign({}, state.signInForm, updatedField)
}

function signup(state = initialState, action) {
  let { textEntered } = action
  let promptText
  let updatedField = {}
  let stepTick = state.signup.stepTick
  let finished = false

  if (stepTick >= 3) {
    finished = true
  }

  switch (stepTick) {
    case 0:
      promptText = `Hello, ${textEntered}. Username?`
      updatedField['displayName'] = textEntered
      break
    case 1:
      promptText = 'What is your email address?'
      updatedField['username'] = textEntered
      break
    case 2:
      promptText = 'Enter a password to use.'
      updatedField['email'] = textEntered
      break
    case 3:
      promptText = `Thanks! You're all set.`
      updatedField['password'] = textEntered
      break
  }

  return Object.assign({}, state, {
    ...state,
    signup: {
      stepTick: state.signup.stepTick + 1,
      promptText,
      fields: Object.assign({}, state.signup.fields, updatedField),
      finished,
    },
  })
}

// TOFIX: no need for ...state
export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SIGN_IN_FORM_CHANGED':
      return Object.assign({}, state, {
        ...state,
        ...{signInForm: loginFormFields(state, action.payload)},
      })
    case actionTypes.LOGIN_FAILURE:
      return state;

    case actionTypes.SIGNUP_NEXT:
      return signup(state, action)

    case 'AUTH_MODE_SWITCH_TO_SIGN_IN':
      return Object.assign({}, state, {
        authMode: authModeSignIn,
      })

    case 'AUTH_MODE_SWITCH_TO_SIGN_UP':
      return Object.assign({}, state, {
        authMode: authModeSignUp,
      })

    case 'AUTH_MODE_RESET':
      return Object.assign({}, state, {
        authMode: '',
      })

    default:
      return state;
  }
}
