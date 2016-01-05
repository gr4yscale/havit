import * as actionTypes from '../actionTypes'

export function friendListCellTapped(objectId) {
  return {
    type: actionTypes.FRIEND_LIST_CELL_TAPPED,
    objectId,
  }
}
