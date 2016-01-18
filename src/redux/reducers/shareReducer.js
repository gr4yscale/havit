import * as actionTypes from '../actionTypes'

const initialState = {
  form: {
    url: '',
    title: '',
    comment: '',
  },
  sharing: false,
  friendsFetching: false,
} // TOFIX: set selectedFriends?

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

    case actionTypes.SHARE_REQUEST:
      return Object.assign({}, state, {
        sharing: true,
      })

    case actionTypes.SHARE_SUCCESS:
      let friends = state.selectedFriends.map((friend) => {
        return Object.assign({}, friend, { selected: false })
      })

      return Object.assign({}, state, {
        ...initialState,
        selectedFriends : friends,
        sharing: false,
        lastIntentUrlReceived: '',
      })

    case 'ALL_IFTTT_ACTIONS_BEGIN':
      return Object.assign({}, state, {
        triggeringIftttActions: true,
      })

    case 'ALL_IFTTT_ACTIONS_SUCCESS':
      return Object.assign({}, state, {
        triggeringIftttActions: false,
      })

    case 'ANDROID_INTENT_RECEIVED':
      return Object.assign({}, state, {
        lastIntentUrlReceived: action.payload.url,
      })



    default:
      return state;
  }
}
