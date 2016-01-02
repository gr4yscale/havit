'use strict'

// import * as actionTypes from '../actionTypes'

const initialState = {
  selectedFriends : {},
}

function selectedFriends(state = initialState, action) {
  debugger;;
  let friendId = state.entities.friends[action.rowId]
  let updatedSelection = {friendId: !state.selectedFriends[friendId]}
  return Object.assign({}, state.selectedFriendIds, updatedSelection)
}

// TOFIX: no need for ...state
export default function share(state = initialState, action) {
  switch (action.type) {
    case 'FRIEND_LIST_CELL_TAPPED':
      return Object.assign({}, state, {
        ...{selectedFriendIds: selectedFriends(state, action)},
      })
    default:
      return state;
  }
}
