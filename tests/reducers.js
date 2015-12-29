import expect from 'expect'
import deepfreeze from 'deep-freeze'
import reducer from '../src/redux/reducers/authReducer'
import * as actionTypes from '../src/redux/actionTypes'

describe('auth reducer', () => {
  it('updates username in auth form fields data without mutation', () => {

    const action = {
      type: actionTypes.AUTH_LOGIN_FORM_CHANGED,
      field: 'username',
      value: 'gr4yscale',
    }

    const beforeState = {
      form: {
        fields: {
          username: 'silly',
          email: 'silly@sally.com',
          password: 'thepass',
        },
      },
    }

    const afterState = {
      form: {
        fields: {
          username: 'gr4yscale',
          email: 'silly@sally.com',
          password: 'thepass',
        },
      },
    }

    // ensure that we don't mutate state
    deepfreeze(beforeState);

    expect(
      reducer(beforeState, action)
    ).toEqual(afterState)
  })
})
