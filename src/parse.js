const BASE_URL = 'https://api.parse.com';

export default class Parse {

  constructor( sessionToken = '') {
    this.applicationId = '[redacted]'
    this.restAPIKey = '[redacted]'
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
      return this.fetchFromParse('GET', '/1/classes/Link')
    } catch(error) {
      throw error;
    }
  }

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
