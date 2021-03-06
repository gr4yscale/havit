import * as actionTypes from '../actionTypes'
import _ from 'lodash'

const initialState = {
  requestCount: 0,
}

export default function server(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...{currentUser: action.response},
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
      })

    case 'LINKS_SENT_SUCCESS':
      return Object.assign({}, state, {
        linksSent : action.payload.results,
      })
    case actionTypes.FRIENDS_REQUEST:
      return Object.assign({}, state, {
        friends: [],
      })
    case actionTypes.FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        friends: action.response.results,
      })
    case actionTypes.USERS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        users: [],
      })
    case actionTypes.USERS_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        users: action.response.results,
      })

    case actionTypes.GET_USER_BY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          action.response.results[0],
        ],
      })


    case 'AUTH_LOGOUT':
      return Object.assign({}, initialState)

    default:
      return state;
  }
}
