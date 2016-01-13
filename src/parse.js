const BASE_URL = 'https://api.parse.com';

export default class Parse {

  constructor(userObjectId, sessionToken) {
    this.applicationId = '1vtTD3vv6uTuaYMbI3Cb1qvqpr4Z9FV6HBa3lzXW'
    this.restAPIKey = 'ntdEELitKO1xruJi260HSUGLUJPZ02leB7W3SBcu'
    this.userObjectId = userObjectId
    this.sessionToken = sessionToken
  }

  signup(data) {
    try {
      return this.fetchFromParse('POST', '/1/users', data);
    } catch(error) {
      throw error;
    }
  }

  login(data) {
    let formBody = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property)
      let encodedValue = encodeURIComponent(data[property])
      formBody.push(`${encodedKey}=${encodedValue}`)
    }
    formBody = formBody.join('&')
    try {
      return this.fetchFromParse('GET',`/1/login?${formBody}`);
    } catch(error) {
      throw error;
    }
  }

  logout() {
    try {
      return this.fetchFromParse('POST', '/1/logout')
    } catch(error) {
      throw error;
    }
  }

  getMyLinks() {
    try {
      let body = `where={"recipient_ids": {"$in": ["${this.userObjectId}"]}}`
      let encodedBody = encodeURIComponent(body)
      let url = `/1/classes/Link?${encodedBody}`
      return this.fetchFromParse('GET', url)
    } catch(error) {
      throw error;
    }
  }

  shareLink(data) {
    try {
      return this.fetchFromParse('POST', '/1/classes/Link', data)
    } catch(error) {
      throw error;
    }
  }

  getFriends() {
    try {
      let body = `where={"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":"${this.userObjectId}"},"key":"friends"}}`
      let encodedBody = encodeURIComponent(body)
      let url = `/1/users?${encodedBody}`
      return this.fetchFromParse('GET', url)
    } catch(error) {
      throw error;
    }
  }

  addFriendToMe(objectId) {
    let params = {
      'friends': {
        '__op': 'AddRelation',
        'objects': [
          {
            '__type': 'Pointer',
            'className': '_User',
            'objectId': `${objectId}`,
          },
        ],
      },
    }
    let url = `/1/users/${this.userObjectId}`
    try {
      return this.fetchFromParse('PUT', url, params)
    } catch(error) {
      throw error;
    }
  }

  getAllUsers() {
    try {
      return this.fetchFromParse('GET', '/1/users')
    } catch(error) {
      throw error;
    }
  }

  getUserByEmail(email) {
    try {
      let body = `where={"email":"${email}"}`
      let encodedBody = encodeURIComponent(body)
      let url = `/1/users?${encodedBody}`
      return this.fetchFromParse('GET', url)
    } catch(error) {
      throw error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fetchFromParse(method = 'GET', url = '', body = '') {
    let requestOptions = {
      method,
      headers: {
        'X-Parse-Application-Id': this.applicationId,
        'X-Parse-REST-API-Key': this.restAPIKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
    if (this.sessionToken) {
      requestOptions.headers['X-Parse-Session-Token'] = this.sessionToken;
    }
    if (body) {
      requestOptions.body = JSON.stringify(body)
    }
    return fetch(BASE_URL + url, requestOptions)
  }
}
