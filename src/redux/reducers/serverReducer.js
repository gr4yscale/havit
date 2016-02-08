import * as actionTypes from '../actionTypes'
import _ from 'lodash'

const initialState = {
  requestCount: 0,
}

// TOFIX: handle error cases

function requestCount(state, increment) {
  if (increment) {
    return state.requestCount + 1
  } else {
    return state.requestCount - 1
  }
}

export default function server(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...{currentUser: action.response},
      })
    case actionTypes.LINKS_RECEIVED_REQUEST:
      return Object.assign({}, state, {
        requestCount: requestCount(state, true),
      })
    case actionTypes.LINKS_RECEIVED_SUCCESS:
      let friends = state.friends
      let links = action.response.results.map(
        (link) => {
          let sender = _.find(friends, {objectId: link.sender_id})
          let senderDisplayName = _.get(sender, 'displayName') ? sender.displayName : 'Unknown Sender'
          // mutating state here, but I don't care...it seems expensive to alloc new objects for this
          return {
            ...link,
            senderDisplayName,
          }
        }
      )
      return Object.assign({}, state, {
        links,
        requestCount: requestCount(state, false),
      })
    case 'LINKS_SENT_REQUEST':
      return Object.assign({}, state, {
        requestCount: requestCount(state, true),
      })
    case 'LINKS_SENT_SUCCESS':
      return Object.assign({}, state, {
        linksSent : action.payload.results,
        requestCount: requestCount(state, false),
      })
    case actionTypes.FRIENDS_REQUEST:
      return Object.assign({}, state, {
        friends: [],
        requestCount: requestCount(state, true),
      })
    case actionTypes.FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        friends: action.response.results,
        requestCount: requestCount(state, false),
      })
    case actionTypes.USERS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        users: [],
        requestCount: requestCount(state, true),
      })
    case actionTypes.USERS_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        users: action.response.results,
        requestCount: requestCount(state, false),
      })

    // TOFIX: handle get_user_by_email_request/fail
    case actionTypes.GET_USER_BY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          action.response.results[0],
        ],
        requestCount: requestCount(state, false),
      })
    case actionTypes.ADD_FRIEND_REQUEST:
      return Object.assign({}, state, {
        requestCount: requestCount(state, true),
      })
    case actionTypes.ADD_FRIEND_SUCCESS:
      return Object.assign({}, state, {
        requestCount: requestCount(state, false),
      })
    case 'REMOVE_FRIEND_REQUEST':
      return Object.assign({}, state, {
        requestCount: requestCount(state, true),
      })
    case 'REMOVE_FRIEND_SUCCESS':
      return Object.assign({}, state, {
        requestCount: requestCount(state, false),
      })
    case 'RESET_REQUEST_COUNT':
      return Object.assign({}, state, {
        requestCount: 0,
      })

    case 'AUTH_LOGOUT':
      return Object.assign({}, initialState)

    default:
      return state;
  }
}
