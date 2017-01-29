/* eslint max-len: "off" */

const REQUEST_TOKEN_URL = `https://api.twitter.com/oauth/request_token?
  oauth_callback=http%3A%2F%2Flocalhost%3A3000%2Fcallback
`.replace(/\s+/g, '');

const REQUEST_TOKEN_OPTS = {
  method: 'POST',
  headers: {
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="8A3xi5GUvtngPldBcV5zZQj9lQw%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
};

const REQUEST_TOKEN_RESPONSE = `
  oauth_token=TOKEN123&
  oauth_token_secret=SECRET123&
  oauth_callback_confirmed=true
`.replace(/\s+/g, '');

const AUTH_URL = `https://api.twitter.com/oauth/authenticate?
  oauth_token=TOKEN123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `?
  oauth_token=TOKEN123&
  oauth_verifier=VERIFIER123
`.replace(/\s+/g, '');

const ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';

const ACCESS_TOKEN_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="xi5FnOqIcPXr%2BViCC3zgg0zmXUw%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_token="TOKEN123",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
  body: 'oauth_verifier=VERIFIER123',
};

const ACCESS_TOKEN_RESPONSE = `
  oauth_token=ACCESSTOKEN123&
  oauth_token_secret=ACCESSTOKENSECRET123&
  user_id=20934183&
  screen_name=adamjmcgrath&
  x_auth_expires=0
`.replace(/\s+/g, '');

const USER_INFO_URL = 'https://api.twitter.com/1.1/account/verify_credentials.json';

const USER_INFO_OPTS = {
  headers: {
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="UbAJ6mznUWS2qpQeirKMnUkG7Ps%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_token="ACCESSTOKEN123",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
};

const USER_INFO_RESPONSE = {
  id: 123,
  name: 'foo',
  screen_name: 'bar',
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [REQUEST_TOKEN_URL, REQUEST_TOKEN_OPTS, REQUEST_TOKEN_RESPONSE, 'get oauth token'],
  [ACCESS_TOKEN_URL, ACCESS_TOKEN_OPTS, ACCESS_TOKEN_RESPONSE, 'get access token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
