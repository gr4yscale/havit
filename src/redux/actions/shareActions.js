import * as actionTypes from '../actionTypes'

export function friendListCellTapped(rowId) {
  return {
    type: actionTypes.FRIEND_LIST_CELL_TAPPED,
    rowId,
  }
}
