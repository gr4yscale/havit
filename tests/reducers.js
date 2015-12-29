import expect from 'expect'
import deepfreeze from 'deep-freeze'
import reducer from '../src/redux/reducers/authReducer'
import {loginFormChanged} from '../src/redux/actions/authActions'

describe('auth reducer', () => {
  it('loginFormChanged action transforms auth form fields data without mutation', () => {

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
      reducer(beforeState, loginFormChanged('username', 'gr4yscale'))
    ).toEqual(afterState)
  })
})
