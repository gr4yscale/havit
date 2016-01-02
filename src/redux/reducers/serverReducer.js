import * as actionTypes from '../actionTypes'

// TOFIX: handle error cases

export default function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.LINKS_RECEIVED_REQUEST:
      return Object.assign({}, state, {
        linksFetching: true,
      })
    case actionTypes.LINKS_RECEIVED_SUCCESS:
      return Object.assign({}, state, {
        links: action.response.results,
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

    default:
      return state;
  }
}
