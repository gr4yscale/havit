import * as actionTypes from '../actionTypes'
import {createAction} from 'redux-actions'
import Parse from '../../parse'
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

const shareRequest = createAction(actionTypes.SHARE_REQUEST)
const shareSuccess = createAction(actionTypes.SHARE_SUCCESS)
const shareFailure = createAction(actionTypes.SHARE_FAILURE)

export function shareLink() {
  return (dispatch, getState) => {
    let postData = shareDataToPost(getState())
    dispatch(shareRequest());
    let parse = configuredParse(getState())
    return parse.shareLink(postData)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let json = JSON.parse(response._bodyInit)
        dispatch(shareSuccess(json))
      } else {
        dispatch(shareFailure(JSON.parse(response._bodyInit)))
      }
    })
    .catch((error) => {
      dispatch(shareFailure(error))
    })
  }
}

function shareDataToPost(state) {
  let form = state.share.form
  let senderId = state.entities.currentUser.objectId
  let friends = state.share.selectedFriends

  let recipientIds = friends.filter((friend) => {
    return (friend.selected === true)
  }).map((friend) => {
    return friend.objectId
  })

  return {
    'url' : form.url,
    'title' : form.title,
    'comment' : form.comment,
    'sender_id' : senderId,
    'recipient_ids' : recipientIds,
  }
}

// IFTTT - Per user - all IFTTT actions
const iftttUserActionsRequest = createAction('IFTTT_USER_ACTIONS_REQUEST')
const iftttUserActionsSuccess = createAction('IFTTT_USER_ACTIONS_SUCCESS')
const iftttUserActionsFailure = createAction('IFTTT_USER_ACTIONS_FAILURE')

export function postIftttActionsToFriend(user, urlToShare, title) {
  return (dispatch, getState) => {
    let fullFriend = _.find(getState().entities.friends, {objectId: user.objectId})
    let senderName = getState().entities.currentUser.displayName

    if (!fullFriend.triggerIftttActionsOnReceiveShare) {
      dispatch(iftttUserActionsSuccess('User does not allow IFTTT actions to trigger when receiving a share.'))
      return Promise.resolve()
    }
    dispatch(iftttUserActionsRequest())

    let requestPromises = []
    let urls = iftttUrlsForUser(fullFriend)

    for (let i = 0; i < urls.length; i++) {
      let iftttUrl = urls[i]
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
    for (let i = 0; i < selectedFriends.length; i++) {
      let friend = selectedFriends[i]
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
  let urlKeys = ['iftttUrl1', 'iftttUrl2', 'iftttUrl3']
  for (let i = 0; i < urlKeys.length; i++) {
    let key = urlKeys[i]
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

export const androidIntentReceieved = createAction('ANDROID_INTENT_RECEIVED')

export const resetSelectedFriends = createAction('RESET_SELECTED_FRIENDS')

// UTILITY / JUNK / CRUFT / GET THIS THE FUCK OUT OF HERE:
//////////////////////////////////////////////////////

function configuredParse(state) {
  let userObjectId = _.get(state, 'entities.currentUser.objectId')
  let sessionToken = _.get(state, 'entities.currentUser.sessionToken')
  return new Parse(userObjectId, sessionToken);
}
