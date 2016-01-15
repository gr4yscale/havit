import * as actionTypes from '../actionTypes'
import _ from 'lodash'

// TOFIX: initial state

// TOFIX: handle error cases

export default function server(state = {}, action) {
  switch (action.type) {
    case actionTypes.LINKS_RECEIVED_REQUEST:
      return Object.assign({}, state, {
        linksFetching: true,
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
        linksFetching: false,
      })
    case actionTypes.FRIENDS_REQUEST:
      return Object.assign({}, state, {
        friends: [],
        friendsFetching: true,
      })
    case actionTypes.FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        friends: action.response.results,
        friendsFetching: false,
      })
    case actionTypes.USERS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        users: [],
        usersFetching: true,
      })
    case actionTypes.USERS_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        users: action.response.results,
        usersFetching: false,
      })

    // TOFIX: handle get_user_by_email_request/fail
    case actionTypes.GET_USER_BY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          action.response.results[0],
        ],
      })

    default:
      return state;
  }
}
