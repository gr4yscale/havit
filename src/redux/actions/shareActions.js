import * as actionTypes from '../actionTypes'

export function friendCellTapped(objectId) {
  return {
    type: actionTypes.SHARE_FRIEND_CELL_TAPPED,
    objectId,
  }
}

export function shareFormChanged(field, value) {
  return {
    type: actionTypes.SHARE_FORM_CHANGED,
    field,
    value,
  }
}
