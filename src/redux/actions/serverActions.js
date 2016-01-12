import * as actionTypes from '../actionTypes'
import Parse from '../../parse'
import _ from 'lodash'

// TOFIX: move this stuff elsewhere, also merge auth actions into serverActions!
import React from 'react-native';
let {
  NativeModules,
  Platform,
} = React


// SIGN UP
//////////////////////////////////////////////////////

export function signupNext(textEntered) {
  return {
    type: actionTypes.SIGNUP_NEXT,
    textEntered,
  }
}

export const signupRequest = () => ({type: actionTypes.SIGNUP_REQUEST})
export const signupSuccess = (json) => ({type: actionTypes.SIGNUP_SUCCESS, response: json})
export const signupFailure = (error) => ({type: actionTypes.SIGNUP_FAILURE, payload: error})

export function signup() {
  return (dispatch, getState) => {
    dispatch(signupRequest());
    let parse = new Parse();
    let data = getState().auth.signup.fields

    return parse.signup(data)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        // TOFIX: reset token on local storage / log out previous user
        // TOFIX: yucky place for this, but just getting android functional for now, will move out later
        if (Platform.OS === 'ios') {
          updateShareExtensionStoreWithCurrentUser(json)
        }
        dispatch(signupSuccess(json))
      } else {
        dispatch(signupFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(signupFailure(error))
    })
  }
}



// LOGIN
//////////////////////////////////////////////////////

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

// TOFIX: refactor to use current state
export function login() {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    let parse = new Parse();
    let username = getState().auth.form.fields.username
    let password = getState().auth.form.fields.password

    return parse.login({
      username,
      password,
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        // TOFIX: reset token on local storage / log out previous user

        // TOFIX: yucky place for this, but just getting android functional for now, will move out later
        if (Platform.OS === 'ios') {
          updateShareExtensionStoreWithCurrentUser(json)
        }
        dispatch(loginSuccess(json))
      } else {
        dispatch(loginFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(loginFailure(error))
    })
  }
}



// LINKS
//////////////////////////////////////////////////////

function linksReceivedRequest() {
  return {
    type: actionTypes.LINKS_RECEIVED_REQUEST,
  }
}

function linksReceivedSuccess(json) {
  return {
    type: actionTypes.LINKS_RECEIVED_SUCCESS,
    response: json,
  }
}

function linksReceivedFailure(error) {
  return {
    type: actionTypes.LINKS_RECEIVED_FAILURE,
    payload: error,
  }
}

export function fetchLinksReceived() {
  return (dispatch, getState) => {
    dispatch(linksReceivedRequest());
    let parse = configuredParse(getState());
    return parse.getMyLinks()
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(linksReceivedSuccess(json))
      } else {
        dispatch(linksReceivedFailure(JSON.parse(response._bodyInit)))
      }
      return response;
    })
    .catch((error) => {
      dispatch(linksReceivedFailure(error))
    })
  }
}


// FRIENDS
//////////////////////////////////////////////////////

function friendsRequest() {
  return {
    type: actionTypes.FRIENDS_REQUEST,
  }
}

export function friendsSuccess(json) {
  return {
    type: actionTypes.FRIENDS_SUCCESS,
    response: json,
  }
}

function friendsFailure(error) {
  return {
    type: actionTypes.FRIENDS_FAILURE,
    payload: error,
  }
}

export function fetchFriends() {
  return (dispatch, getState) => {
    dispatch(friendsRequest());
    let parse = configuredParse(getState());
    return parse.getFriends()
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(friendsSuccess(json))

        // TOFIX: yucky place for this, but just getting android functional for now, will move out later
        if (Platform.OS === 'ios') {
          updateShareExtensionStoreWithFriends(json)
        }
      } else {
        dispatch(friendsFailure(JSON.parse(response._bodyInit)))
      }
      return response;
    })
    .catch((error) => {
      dispatch(friendsFailure(error))
    })
  }
}



// SHARE
//////////////////////////////////////////////////////

function shareRequest() {
  return {
    type: actionTypes.SHARE_REQUEST,
  }
}

function shareSuccess(json) {
  return {
    type: actionTypes.SHARE_SUCCESS,
    response: json,
  }
}

function shareFailure(error) {
  return {
    type: actionTypes.SHARE_FAILURE,
    payload: error,
  }
}

export function shareLink() {
  return (dispatch, getState) => {

    let form = getState().share.form
    let senderId = getState().auth.currentUser.objectId
    let friends = getState().share.selectedFriends

    let recipientIds = friends.filter((friend) => {
      return (friend.selected === true)
    }).map((friend) => {
      return friend.objectId
    })

    let postData = {
      'url' : form.url,
      'title' : form.title,
      'comment' : form.comment,
      'sender_id' : senderId,
      'recipient_ids' : recipientIds,
    }

    dispatch(shareRequest());
    let parse = configuredParse(getState());
    return parse.shareLink(postData)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(shareSuccess(json))

        //TOFIX: refactor
        if (Platform.OS === 'ios') {
          notifyShareExtensionOfCompletion()
        }
      } else {
        dispatch(shareFailure(JSON.parse(response._bodyInit)))
      }
      return response;
    })
    .catch((error) => {
      dispatch(linksReceivedFailure(error))
    })
  }
}

// UTILITY / JUNK / CRUFT / GET THIS THE FUCK OUT OF HERE:
//////////////////////////////////////////////////////

function configuredParse(state) {
  let userObjectId = _.get(state, 'auth.currentUser.objectId')
  let sessionToken = _.get(state, 'auth.currentUser.sessionToken')
  return new Parse(userObjectId, sessionToken);
}

function updateShareExtensionStoreWithFriends(json) {
  let HVTShareExtensionStorage = NativeModules.HVTShareExtensionStorage
  HVTShareExtensionStorage.updateFriends(json)
}

function updateShareExtensionStoreWithCurrentUser(json) {
  let HVTShareExtensionStorage = NativeModules.HVTShareExtensionStorage
  HVTShareExtensionStorage.updateCurrentUser(json)
}

function notifyShareExtensionOfCompletion() {
  let RootShareViewController = NativeModules.RootShareViewController
  RootShareViewController.shareComplete()
}
