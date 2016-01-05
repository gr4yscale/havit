import * as actionTypes from '../actionTypes'

const initialState = {
  form: {
    url: '',
    title: '',
    comment: '',
  },
}

// TOFIX: find or build a way to make this cleaner (auto create actions, specify a state shape for reducer)
function shareFormFields(state = initialState, action) {
  let { field, value } = action;
  let updatedField = {};
  updatedField[field] = value;
  return Object.assign({}, state.form, updatedField)
}

export default function share(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHARE_FORM_CHANGED:
      return Object.assign({}, state, {
        ...{form : shareFormFields(state, action)},
      })

    case actionTypes.SHARE_FRIEND_CELL_TAPPED:
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
