import * as actionTypes from '../actionTypes'

// TOFIX: initial state

// TOFIX: handle error cases

export default function server(state = {}, action) {
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
