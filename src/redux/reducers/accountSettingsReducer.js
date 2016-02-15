import * as actionTypes from '../actionTypes'

const initialState = {
  iftttActions: [
    {
      alias: `Unused`,
      actionButtonDisplay: `📌`,
      enabledOnInbox: false,
      triggerOnShareReceive: false,
      url: '',
    },
    {
      alias: 'Unused',
      actionButtonDisplay: `👻`,
      enabledOnInbox: false,
      triggerOnShareReceive: false,
      url: '',
    },
    {
      alias: 'Unused',
      actionButtonDisplay: `🎉`,
      enabledOnInbox: false,
      triggerOnShareReceive: false,
      url: '',
    },
    {
      alias: 'Unused',
      actionButtonDisplay: `📷`,
      enabledOnInbox: false,
      triggerOnShareReceive: false,
      url: '',
    },
  ],
  selectedActionIndex: 0,
}

function iftttField(state, action, index) {
  let { field, value } = action.payload
  let updatedField = {}
  updatedField[field] = value

  let toReturn = Object.assign({}, state.iftttActions[index], updatedField)

  if (field === 'alias') {
    let updatedActionButtonDisplayField = {}
    updatedActionButtonDisplayField['actionButtonDisplay'] = value.substr(0, 4)   // tofix: later subtring/uppercase specificity if this is not emoji...emoji has a variable byte length, so have to leave at least 4 bytes
    toReturn = Object.assign({}, toReturn, updatedActionButtonDisplayField)
  }
  return toReturn
}

export default function accountSettings(state = initialState, action) {
  switch (action.type) {
    case 'ACCOUNT_SETTINGS_SELECTED_IFTTT_ACTION_CHANGED':
      return Object.assign({}, state, {
        selectedActionIndex: action.payload,
      })
    case 'ACCOUNT_SETTINGS_IFTTT_ACTION_FIELD_CHANGED':
      let { field, value } = action.payload
      let updatedField = {}
      updatedField[field] = value

      let index = state.selectedActionIndex

      return Object.assign({}, state, {
        iftttActions: [
          ...state.iftttActions.slice(0, index),
          iftttField(state, action, index),
          ...state.iftttActions.slice(index + 1),
        ],
      })
    case actionTypes.LOGIN_SUCCESS:
      let iftttActions = []
      if (action.response.iftttActions) iftttActions = action.response.iftttActions
      return Object.assign({}, state, {
        iftttActions,
      })
    default:
      return state;
  }
}
