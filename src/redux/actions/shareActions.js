import * as actionTypes from '../actionTypes'
import {createAction} from 'redux-actions'
import _ from 'lodash'

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

// IFTTT - Per user - all IFTTT actions
const iftttUserActionsRequest = createAction('IFTTT_USER_ACTIONS_REQUEST')
const iftttUserActionsSuccess = createAction('IFTTT_USER_ACTIONS_SUCCESS')
const iftttUserActionsFailure = createAction('IFTTT_USER_ACTIONS_FAILURE')

export function postIftttActionsToFriend(user, urlToShare, title) {
  return (dispatch, getState) => {
    let fullFriend = _.find(getState().entities.friends, {objectId: user.objectId})
    let senderName = getState().auth.currentUser.displayName

    if (!fullFriend.triggerIftttActionsOnReceiveShare) {
      dispatch(iftttUserActionsSuccess('User does not allow IFTTT actions to trigger when receiving a share.'))
      return Promise.resolve()
    }
    dispatch(iftttUserActionsRequest())

    let requestPromises = []
    for (let iftttUrl of iftttUrlsForUser(fullFriend)) {
      let requestPromise = iftttRequest(urlToShare, iftttUrl, title, senderName)
      // .then((response) => console.log('****', response))
      requestPromises.push(requestPromise)
    }

    return Promise.all(requestPromises)
    .then(() => {
      dispatch(iftttUserActionsSuccess())
    })
    .catch((error) => {
      console.log('error triggering *user* IFTTT actions! *********', error)
      dispatch(iftttUserActionsFailure(error))
    })
  }
}

// IFTTT - For entire all selected users on share screen
const postAllIftttActionsBegin = createAction('ALL_IFTTT_ACTIONS_BEGIN')
const postAllIftttActionsSuccess = createAction('ALL_IFTTT_ACTIONS_SUCCESS')
const postAllIftttActionsFail = createAction('ALL_IFTTT_ACTIONS_FAIL')

export function postAllIftttActions() {
  return (dispatch, getState) => {
    dispatch(postAllIftttActionsBegin())

    const isSelected = (friend) => {return friend.selected}
    let shareState = getState().share
    let selectedFriends = shareState.selectedFriends.filter(isSelected)
    let url = shareState.form.url
    let title = shareState.form.title

    let actions = []
    for (let friend of selectedFriends) {
      actions.push(dispatch(postIftttActionsToFriend(friend, url, title)))
    }

    return Promise.all(actions)
    .then(() => {
      dispatch(postAllIftttActionsSuccess())
    })
    .catch((error) => {
      console.log('error triggering all IFTTT actions! *********', error)
      dispatch(postAllIftttActionsFail(error))
    })
  }
}

function iftttUrlsForUser(user) {
  let iftttUrls = []
  for (let key of ['iftttUrl1', 'iftttUrl2', 'iftttUrl3']) {
    if (user[key]) {
      iftttUrls.push(user[key])
    }
  }
  return iftttUrls
}

function iftttRequest(urlToShare, iftttUrl, title, senderName) {
  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      'value1':urlToShare,
      'value2':title,
      'value3':senderName,
    }),
  }
  return fetch(iftttUrl, requestOptions)
}
