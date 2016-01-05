import * as actionTypes from '../actionTypes'

const initialState = {}

export default function share(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FRIEND_LIST_CELL_TAPPED:
      return Object.assign({}, state, {
        selectedFriends : state.selectedFriends.map((friend) => {
          return friend.objectId === action.objectId ?
            Object.assign({}, friend, { selected: !friend.selected }) : friend
        }),
      })

    case actionTypes.FRIENDS_REQUEST:
      return Object.assign({}, state, {
        friendsFetching: true,
      })

    case actionTypes.FRIENDS_SUCCESS:
      let selectedFriends = action.response.results.map(
        (friend) => Object.assign({}, { objectId: friend.objectId,
                                     displayName: friend.displayName,
                                        selected: false,
                                       })
      )
      return Object.assign({}, state, {
        selectedFriends,
        friendsFetching: false,
      })
    default:
      return state;
  }
}
