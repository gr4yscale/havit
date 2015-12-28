// import * as actionTypes from '../actionTypes';
//
// export default function comments(state = [], action) {
//   switch (action.type) {
//   case actionTypes.COMMENTS_REQUEST:
//     return Object.assign({}, state, {
//       isFetching: true,
//       items: [],
//     })
//   case actionTypes.COMMENTS_SUCCESS:
//     // TOFIX: mutating state? test this.
//     return Object.assign({}, state, {
//       isFetching: false,
//       items: [...action.comments],
//     })
//   default:
//     return state;
//   }
// }


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
