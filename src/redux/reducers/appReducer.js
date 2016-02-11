import * as actionTypes from '../actionTypes'

const initialState = {
  lastClipboardUrl: '',
}

// TOFIX: handle request failures

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_LAST_CLIPBOARD_URL':
      return Object.assign({}, state, {
        lastClipboardUrl: action.payload,
      })

    // request count state, should probably be in its own reducer

    case actionTypes.LINKS_RECEIVED_REQUEST:
    case 'LINKS_SENT_REQUEST':
    case actionTypes.ADD_FRIEND_REQUEST:
    case 'REMOVE_FRIEND_REQUEST':
    case 'IFTTT_TO_MYSELF_REQUEST':
    case actionTypes.FRIENDS_REQUEST:
    case actionTypes.USERS_GET_ALL_REQUEST:
    case actionTypes.GET_USER_BY_EMAIL_REQUEST:

      return Object.assign({}, state, {
        requestCount: state.requestCount + 1,
      })

    case actionTypes.LINKS_RECEIVED_SUCCESS:
    case actionTypes.LINKS_RECEIVED_FAILURE:
    case 'LINKS_SENT_SUCCESS':
    case 'LINKS_SENT_FAILURE':
    case actionTypes.ADD_FRIEND_SUCCESS:
    case actionTypes.ADD_FRIEND_FAILURE:
    case 'REMOVE_FRIEND_SUCCESS':
    case 'REMOVE_FRIEND_FAILURE':
    case 'IFTTT_TO_MYSELF_SUCCESS':
    case 'IFTTT_TO_MYSELF_FAILURE':
    case actionTypes.FRIENDS_SUCCESS:
    case actionTypes.FRIENDS_FAILURE:
    case actionTypes.USERS_GET_ALL_SUCCESS:
    case actionTypes.USERS_GET_ALL_FAILURE:
    case actionTypes.GET_USER_BY_EMAIL_SUCCESS:
    case actionTypes.GET_USER_BY_EMAIL_FAILURE:

      return Object.assign({}, state, {
        requestCount: state.requestCount - 1,
      })

    case 'RESET_REQUEST_COUNT':
      return Object.assign({}, state, {
        requestCount: 0,
      })
    default:
      return state;
  }
}
