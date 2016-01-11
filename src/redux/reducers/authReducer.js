'use strict'

import * as actionTypes from '../actionTypes'

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
  authType: 'signup',
}

function loginFormFields(state = initialState, action) {
  let { field, value } = action
  let updatedField = {}
  updatedField[field] = value
  return Object.assign({}, state.form.fields, updatedField)
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
      promptText = 'What username do you want?'
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
      promptText = `Thanks! You're all finished.`
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
    case actionTypes.LOGIN_FORM_CHANGED:
      return Object.assign({}, state, {
        ...state,
        ...{form : {fields: loginFormFields(state, action)}},
      })
    case actionTypes.LOGIN_REQUEST:
      return state;
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...{currentUser: action.response},
      })

    case actionTypes.LOGIN_FAILURE:
      return state;

    case actionTypes.SIGNUP_NEXT:
      return signup(state, action)

    default:
      return state;
  }
}
