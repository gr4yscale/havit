import { COMMENTS_REQUEST, COMMENTS_SUCCESS } from '../actions/api';

export default function comments(state = [], action) {
  switch (action.type) {
  case COMMENTS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      items: [],
    })
  case COMMENTS_SUCCESS:
    // TOFIX: mutating state? test this.
    return Object.assign({}, state, {
      isFetching: false,
      items: [...action.comments],
    })
  default:
    return state;
  }
}


// import { SET_SELECTED_USER } from '../actions/user';

// export default function user(state = [], action) {
//   switch (action.type) {
//     case SET_SELECTED_USER:
//       return Object.assign({}, state, {
//         selectedUser: action.user`
//       })
//     default:
//       return state;
//   }
// }
