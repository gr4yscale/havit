import expect from 'expect';
import deepfreeze from 'deep-freeze';
// import reducer from '../src/reducers/authReducer';

describe('auth reducer', () => {
  it('updates username in auth form fields data without mutation', () => {

    const action = {
                      type: 'ON_AUTH_FORM_FIELD_CHANGE',
                      payload: {
                        field: 'username',
                        value: 'gr4yscale'
                      }
                    }

    const beforeState = {
        form: {
          fields: {
            username: 'silly',
            email: 'silly@sally.com',
            password: 'thepass'
          }
        }
      }

    const afterState = {
        form: {
          fields: {
            username: 'gr4yscale',
            email: 'silly@sally.com',
            password: 'thepass'
          }
        }
    }
    // ensure that we don't mutate state
    deepfreeze(beforeState);

    expect(
      console.log('yo')
      // console.log('derp');
        // reducer(beforeState, action)
    ).toEqual([])
  })
})
