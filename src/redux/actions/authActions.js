import {createAction} from 'redux-actions'
import {Actions} from '../../../node_modules/react-native-router-flux'
import * as serverActions from './serverActions'

export const authModeSignIn = 'signin'
export const authModeSignUp = 'signup'

const authSwitchToSignUp = createAction('AUTH_SWITCH_TO_SIGN_UP')
const authSwitchToSignIn = createAction('AUTH_SWITCH_TO_SIGN_IN')

export const loginFormChanged = createAction('AUTH_SIGN_IN_FORM_CHANGED')

export function authSignInButtonPressed() {
  return (dispatch, getState) => {
    let authMode = getState().auth.authMode
    let signInFields = getState().auth.form.fields

    if (authMode === authModeSignUp || authMode === '') {
      dispatch(authSwitchToSignIn())
    } else if (authMode === authModeSignIn) {
      return dispatch(serverActions.login(signInFields.username, signInFields.password))
            .then(() => dispatch(serverActions.fetchFriends()))
            .then(() => dispatch(serverActions.fetchLinksReceived()))
            .then(() => dispatch(serverActions.fetchLinksSent()))
            .then(() => Actions.MainContainer())
    }
  }
}
