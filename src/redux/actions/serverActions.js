import * as actionTypes from '../actionTypes'
import Parse from '../../parse'
import _ from 'lodash'

// links receieved

export function linksReceivedRequest() {
  return {
    type: actionTypes.LINKS_RECEIVED_REQUEST,
  }
}

export function linksReceivedSuccess(json) {
  return {
    type: actionTypes.LINKS_RECEIVED_SUCCESS,
    response: json,
  }
}

export function linksReceivedFailure(error) {
  return {
    type: actionTypes.LINKS_RECEIVED_FAILURE,
    payload: error,
  }
}

export function fetchLinksReceived() {
  return (dispatch, getState) => {
    dispatch(linksReceivedRequest());
    let sessionToken = _.get(getState(), 'auth.currentUser.sessionToken');
    let parse = new Parse(sessionToken);
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
