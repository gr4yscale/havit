// Reminder: action creator methods can return a "thunk" function with the signature:
// return (dispatch, getState) => {}

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';

export const endpoint = 'http://api.soundcloud.com/tracks/198545703/comments?client_id=89ae6050d2fb321d2ac9be2e2d822596';

function requestComments() {
  return {
    type: COMMENTS_REQUEST
  }
}

function successComments(json) {
  return {
    type: COMMENTS_SUCCESS,
    comments: json
  }
}

export function fetchComments() {
  return (dispatch) => {
    dispatch(requestComments())
    return fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        dispatch(successComments(json))
      })
      .catch(error => console.log(error))
  }
}
