import {createAction} from 'redux-actions'
import * as serverActions from './serverActions'
import {Actions} from '../../../node_modules/react-native-router-flux'

export const authModeSignIn = 'signin'
export const authModeSignUp = 'signup'

const authModeSwitchToSignIn = createAction('AUTH_MODE_SWITCH_TO_SIGN_IN') // this isn't a promise
const authModeSwitchToSignUp = createAction('AUTH_MODE_SWITCH_TO_SIGN_UP')

export const authModeReset = createAction('AUTH_MODE_RESET')
export const signInFormChanged = createAction('AUTH_SIGN_IN_FORM_CHANGED')
export const signUpFormChanged = createAction('AUTH_SIGN_UP_FORM_CHANGED')

export function authSignInButtonPressed() {
  return (dispatch, getState) => { // this is a promise (redux-thunk)
    let authMode = getState().auth.authMode
    let signInForm = getState().auth.signInForm

    if (authMode === authModeSignUp || authMode === '' || !signInForm) { // TOFIX: no defensive coding, why is this a possibility?
      dispatch(authModeSwitchToSignIn())
      return Promise.resolve()
    } else if (authMode === authModeSignIn) {
      return dispatch(serverActions.login(signInForm.username, signInForm.password))
            .then(() => dispatch(serverActions.fetchLinksReceived()))
            .then(() => Actions.MainContainer())
            .then(() => dispatch(serverActions.fetchFriends()))
            .then(() => dispatch(serverActions.fetchLinksSent()))
    }
  }
}

export function authSignUpButtonPressed() {
  return (dispatch, getState) => {
    let authMode = getState().auth.authMode
    let signUpForm = getState().auth.signUpForm

    if (authMode === authModeSignIn || authMode === '' || !signUpForm) { // TOFIX: no defensive coding, why is this a possibility?
      dispatch(authModeSwitchToSignUp())
      return Promise.resolve()
    } else if (authMode === authModeSignUp) {
      return dispatch(serverActions.signup())
            .then(() => Actions.MainContainer())
    }
  }
}
