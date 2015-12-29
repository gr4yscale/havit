import * as actionTypes from '../actionTypes'

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
    default:
      return state;
  }
}
