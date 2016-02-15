import * as actionTypes from '../actionTypes'
import Parse from '../../parse'
import _ from 'lodash'
import {createAction} from 'redux-actions'
import {resetSelectedFriends} from '../actions/shareActions'

// TOFIX: move this stuff elsewhere, also merge auth actions into serverActions!
import React from 'react-native';
let {
  NativeModules,
  Platform,
} = React


// SIGN UP
//////////////////////////////////////////////////////

export const signupRequest = () => ({type: actionTypes.SIGNUP_REQUEST})
export const signupSuccess = (json) => ({type: actionTypes.SIGNUP_SUCCESS, response: json})
export const signupFailure = (error) => ({type: actionTypes.SIGNUP_FAILURE, payload: error})

export function signup() {
  return (dispatch, getState) => {
    dispatch(signupRequest());

    let data = getState().auth.signUpForm
    data['iftttActions'] = getState().accountSettings.iftttActions

    let parse = new Parse();
    return parse.signup(data)
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        dispatch(signupSuccess(json))
        return dispatch(login(data.username, data.password))
      } else {
        dispatch(signupFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}


// LOGIN
//////////////////////////////////////////////////////

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

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    let parse = new Parse();
    return parse.login({
      username,
      password,
    })
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        // TOFIX: yucky place for this, but just getting android functional for now, will move out later
        if (Platform.OS === 'ios') {
          updateShareExtensionStoreWithCurrentUser(json)
        }
        return dispatch(loginSuccess(json))
      } else {
        dispatch(loginFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}


// Update User
//////////////////////////////////////////////////////

const updateCurrentUserRequest = createAction('UPDATE_CURRENT_USER_REQUEST')
const updateCurrentUserSuccess = createAction('UPDATE_CURRENT_USER_SUCCESS')
const updateCurrentUserFailure = createAction('UPDATE_CURRENT_USER_FAILURE')

export function updateCurrentUser() {
  return (dispatch, getState) => {
    dispatch(updateCurrentUserRequest());

    let data = {}
    data['iftttActions'] = getState().accountSettings.iftttActions
    data['displayName'] = getState().accountSettings.displayName

    let parse = configuredParse(getState());
    return parse.updateCurrentUser(data)
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(updateCurrentUserSuccess(json))
      } else {
        dispatch(updateCurrentUserFailure(json.error))
        return Promise.reject(json.error)
      }
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
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(linksReceivedSuccess(json))
      } else {
        dispatch(linksReceivedFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}


// LINKS SENT
//////////////////////////////////////////////////////

const linksSentRequest = createAction('LINKS_SENT_REQUEST')
const linksSentSuccess = createAction('LINKS_SENT_SUCCESS')
const linksSentFailure = createAction('LINKS_SENT_FAILURE')

export function fetchLinksSent() {
  return (dispatch, getState) => {
    dispatch(linksSentRequest());
    let parse = configuredParse(getState());
    return parse.getSentLinks()
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(linksSentSuccess(json))
      } else {
        dispatch(linksSentFailure(json.error))
        return Promise.reject(json.error)
      }
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
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        dispatch(friendsSuccess(json))
        dispatch(resetSelectedFriends(json.results)) // TOFIX: too imperitive

        // TOFIX: yucky place for this, but just getting android functional for now, will move out later
        if (Platform.OS === 'ios') {
          updateShareExtensionStoreWithFriends(json)
        }
        return Promise.resolve()
      } else {
        dispatch(friendsFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}


//////////////////////////////////////////////////////
// Users Users Users Users Users Users Users Users
//////////////////////////////////////////////////////

export const getAllUsersRequest = () => ({type: actionTypes.USERS_GET_ALL_REQUEST})
export const getAllUsersSuccess = (json) => ({type: actionTypes.USERS_GET_ALL_SUCCESS, response: json})
export const getAllUsersFailure = (error) => ({type: actionTypes.USERS_GET_ALL_FAILURE, payload: error})

export function getAllUsers() {
  return (dispatch) => {
    dispatch(getAllUsersRequest());
    let parse = new Parse()
    return parse.getAllUsers()
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(getAllUsersSuccess(json))
      } else {
        dispatch(getAllUsersFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}

// TOFIX: change get to fetch

export const getUserByEmailRequest = (email) => ({type: actionTypes.GET_USER_BY_EMAIL_REQUEST, email})
export const getUserByEmailSuccess = (json) => ({type: actionTypes.GET_USER_BY_EMAIL_SUCCESS, response: json})
export const getUserByEmailFailure = (error) => ({type: actionTypes.GET_USER_BY_EMAIL_FAILURE, payload: error})

export function fetchUserByEmail(email) {
  return (dispatch) => {
    dispatch(getUserByEmailRequest(email));
    let parse = new Parse()
    return parse.getUserByEmail(email)
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(getUserByEmailSuccess(json))
      } else {
        dispatch(getUserByEmailFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}

export function getUserByEmail(state, email) {
  return _.find(state.entities.users, {email})
}

export function fetchUserByEmailIfNeeded(email) {
  return (dispatch, getState) => {
    if (!getUserByEmail(getState(), email)) {
      return dispatch(fetchUserByEmail(email))
    } else {
      return Promise.resolve()
    }
  }
}

export const addFriendRequest = () => ({type: actionTypes.ADD_FRIEND_REQUEST})
const addFriendSuccess = (json) => ({type: actionTypes.ADD_FRIEND_SUCCESS, response: json})
const addFriendFailure = (error) => ({type: actionTypes.ADD_FRIEND_FAILURE, payload: error})

export function addFriend(email) {
  return (dispatch, getState) => {
    return dispatch(fetchUserByEmailIfNeeded(email))
    .then(() => {
      dispatch(addFriendRequest())

      let friend = getUserByEmail(getState(), email)
      let parse = configuredParse(getState());

      return parse.addFriendToMe(friend.objectId)
      .then((response) => {
        let json = JSON.parse(response._bodyInit)
        if (response.status === 200 || response.status === 201) {
          return dispatch(addFriendSuccess(json))
        } else {
          dispatch(addFriendFailure(json.error))
          return Promise.reject(json.error)
        }
      })
    })
  }
}

const removeFriendRequest = createAction('REMOVE_FRIEND_REQUEST')
const removeFriendSuccess = createAction('REMOVE_FRIEND_SUCCESS')
const removeFriendFailure = createAction('REMOVE_FRIEND_FAILURE')

export function removeFriend(objectId) {
  return (dispatch, getState) => {
    dispatch(removeFriendRequest())
    let parse = configuredParse(getState());
    return parse.removeFriendFromMe(objectId)
    .then((response) => {
      let json = JSON.parse(response._bodyInit)
      if (response.status === 200 || response.status === 201) {
        return dispatch(removeFriendSuccess(json))
      } else {
        dispatch(removeFriendFailure(json.error))
        return Promise.reject(json.error)
      }
    })
  }
}

const iftttToMyselfRequest = createAction('IFTTT_TO_MYSELF_REQUEST')
const iftttToMyselfSuccess = createAction('IFTTT_TO_MYSELF_SUCCESS')
const iftttToMyselfFailure = createAction('IFTTT_TO_MYSELF_FAILURE')

export function iftttToMyself(actionIndex, linkData) {
  return (dispatch, getState) => {
    dispatch(iftttToMyselfRequest())

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'value1':linkData.url,
        'value2':linkData.title,
        'value3':linkData.senderName,
      }),
    }

    let iftttUrl = getState().accountSettings.iftttActions[actionIndex].url

    fetch(iftttUrl, requestOptions)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return dispatch(iftttToMyselfSuccess())
      } else {
        dispatch(iftttToMyselfFailure(requestOptions))
        return Promise.reject(requestOptions)
      }
    })
  }
}

// UTILITY / JUNK / CRUFT / GET THIS THE FUCK OUT OF HERE:
//////////////////////////////////////////////////////

function configuredParse(state) {
  let userObjectId = _.get(state, 'entities.currentUser.objectId')
  let sessionToken = _.get(state, 'entities.currentUser.sessionToken')
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
