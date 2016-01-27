import * as actionTypes from '../actionTypes'

const initialState = {
  form: {
    url: '',
    title: '',
    comment: '',
  },
  sharing: false,
  friendsFetching: false,
  shareDataValid: false,
  lastIntentUrlReceived: '',
} // TOFIX: set selectedFriends?

// TOFIX: find or build a way to make this cleaner (auto create actions, specify a state shape for reducer)
function shareFormFields(state = initialState, action) {
  let { field, value } = action;
  let updatedField = {};
  updatedField[field] = value;
  return Object.assign({}, state.form, updatedField)
}

function shareDataIsValid(state) {
  let atLeastOneFriendSelected = false
  for (let i = 0; i < state.selectedFriends.length; i++) { //TOFIX: using yucky syntax until Symbol ES6 polyfill is working on Android
    let friend = state.selectedFriends[i]
    if (friend.selected) { atLeastOneFriendSelected = true }
  }
  if (atLeastOneFriendSelected && state.form.title !== '' && state.form.url !== '') {
    return true
  } else {
    return false
  }
}

export default function share(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHARE_FORM_CHANGED:
      return Object.assign({}, state, {
        ...{form : shareFormFields(state, action)},
        shareDataValid: shareDataIsValid(state),
      })

    case actionTypes.SHARE_FRIEND_CELL_TAPPED:
      let newState = Object.assign({}, state, {
        selectedFriends : state.selectedFriends.map((friend) => {
          return friend.objectId === action.objectId ?
            Object.assign({}, friend, { selected: !friend.selected }) : friend
        }),
      })
      return Object.assign({}, state, {
        ...newState,
        shareDataValid: shareDataIsValid(newState),
      })

    case actionTypes.FRIENDS_REQUEST:
      return Object.assign({}, state, {
        friendsFetching: true,
      })

    case 'RESET_SELECTED_FRIENDS':
      let selectedFriends = action.payload.map(
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
