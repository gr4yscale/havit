import * as actionTypes from '../actionTypes'
import Parse from '../../parse'
import _ from 'lodash'

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

export function fetchFriends() {
  return (dispatch, getState) => {
    dispatch(friendsRequest());
    let parse = configuredParse(getState());
    return parse.getFriends()
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(friendsSuccess(json))
      } else {
        dispatch(friendsFailure(JSON.parse(response._bodyInit)))
      }
      return response;
    })
    .catch((error) => {
      dispatch(linksReceivedFailure(error))
    })
  }
}



// links receieved

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

// friends

function friendsRequest() {
  return {
    type: actionTypes.FRIENDS_REQUEST,
  }
}

function friendsSuccess(json) {
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

function configuredParse(state) {
  let userObjectId = _.get(state, 'auth.currentUser.objectId')
  let sessionToken = _.get(state, 'auth.currentUser.sessionToken')
  return new Parse(userObjectId, sessionToken);
}
