'use strict'

import * as actionTypes from '../actionTypes'

const initialState = {
  form: {
    fields: {
      username: '',
      email: '',
      password: '',
    },
  },
}

function loginFormFields(state = [], action) {
  let { field, value } = action;
  let updatedField = {};
  updatedField[field] = value;
  return Object.assign({}, state.form.fields, updatedField)
}

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

    default:
      return state;
  }
}
