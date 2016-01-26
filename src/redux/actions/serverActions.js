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
        dispatch(signupSuccess(json))
        dispatch(login(data.username, data.password))
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
    })
    .catch((error) => {
      dispatch(linksReceivedFailure(error))
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
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(linksSentSuccess(json))
      } else {
        dispatch(linksSentFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(linksSentFailure(error))
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
        dispatch(resetSelectedFriends(json.results)) // TOFIX: too imperitive

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
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(getAllUsersSuccess(json))
      } else {
        dispatch(getAllUsersFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(getAllUsersFailure(error))
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
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(getUserByEmailSuccess(json))
      } else {
        dispatch(getUserByEmailFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(getUserByEmailFailure(error))
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
        if (response.status === 200 || response.status === 201) {
          let json = JSON.parse(response._bodyInit)
          dispatch(addFriendSuccess(json))
        } else {
          dispatch(addFriendFailure(JSON.parse(response._bodyInit)))
        }
      })
    })
    .catch((error) => {
      dispatch(addFriendFailure(error))
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
