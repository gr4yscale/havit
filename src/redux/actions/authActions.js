import * as actionTypes from '../actionTypes'
import Parse from '../../parse'

// TOFIX: move this stuff elsewhere
import React from 'react-native';
let { NativeModules } = React
let HVTShareExtensionStorage = NativeModules.HVTShareExtensionStorage

export function loginFormChanged(field, value) {
  return {
    type: actionTypes.LOGIN_FORM_CHANGED,
    field,
    value,
  }
}

export function loginRequest() {
  return {
    type: actionTypes.LOGIN_REQUEST,
  }
}

export function loginSuccess(json) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    response: json,
  }
}

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  }
}

function updateShareExtensionStoreWithCurrentUser(json) {
  HVTShareExtensionStorage.updateCurrentUser(json)
}

export function login(username,  password) {
  return (dispatch) => {
    dispatch(loginRequest());
    let parse = new Parse();
    return parse.login({
      username,
      password,
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        // TOFIX: reset token on local storage / log out previous user
        // dispatch(logoutState());
        dispatch(loginSuccess(json))
        updateShareExtensionStoreWithCurrentUser(json)
      } else {
        dispatch(loginFailure(JSON.parse(response._bodyInit)))
      }
      return response;
    })
    .catch((error) => {
      dispatch(loginFailure(error))
    })
  }
}
