import * as actionTypes from '../actionTypes'

export function loginFormChanged(field, value) {
  return {
    type: actionTypes.AUTH_LOGIN_FORM_CHANGED,
    field,
    value,
  }
}
