const initialState = {
  lastClipboardUrl: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_LAST_CLIPBOARD_URL':
      return Object.assign({}, state, {
        lastClipboardUrl: action.payload,
      })
    default:
      return state;
  }
}
