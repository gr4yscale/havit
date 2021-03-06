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

// TOFIX: being lazy, sharing to yourself should probably be its own separate method
export function shareLink(toOthers) {
  return (dispatch, getState) => {
    let postData
    if (toOthers) {
      postData = shareDataToPostForOthers(getState())
    } else {
      postData = shareDataToPostForMyself(getState())
    }
    dispatch(shareRequest());
    let parse = configuredParse(getState())
    return parse.shareLink(postData)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
        .then((json) => {
          return dispatch(shareSuccess(json))
        })
      } else {
        let json = JSON.parse(response._bodyInit)
        dispatch(shareFailure(json.error))
      }
    })
    .catch((error) => {
      dispatch(shareFailure(error))
    })
  }
}

function shareDataToPostForOthers(state) {
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

function shareDataToPostForMyself(state) {
  let form = state.share.form
  let senderId = state.entities.currentUser.objectId

  return {
    'url' : form.url,
    'title' : form.title,
    'comment' : form.comment,
    'sender_id' : senderId,
    'recipient_ids' : [senderId],
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

    let urls = iftttUrlsForUser(fullFriend)

    if (urls.length === 0) {
      dispatch(iftttUserActionsSuccess('User does not allow IFTTT actions to trigger when receiving a share.'))
      return Promise.resolve()
    }

    dispatch(iftttUserActionsRequest())

    let requestPromises = []
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
  let actions = user.iftttActions

  if (!actions) {
    return []
  } else {
    for (let i = 0; i < actions.length; i++) {
      let action = actions[i]
      if (action.triggerOnShareReceive) {
        iftttUrls.push(action.url)
      }
    }
    return iftttUrls
  }
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
