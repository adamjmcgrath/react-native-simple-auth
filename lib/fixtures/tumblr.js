/* eslint max-len: "off" */

const REQUEST_TOKEN_URL = `https://www.tumblr.com/oauth/request_token?
  oauth_callback=http%3A%2F%2Flocalhost%3A3000%2Fcallback
`.replace(/\s+/g, '');

const REQUEST_TOKEN_OPTS = {
  method: 'POST',
  headers: {
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="qi12mahCUbaTvKSjJHhLzHG99x0%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
};

const REQUEST_TOKEN_RESPONSE = `
  oauth_token=TOKEN123&o
  auth_token_secret=SECRET123&
  oauth_callback_confirmed=true
`.replace(/\s+/g, '');

const AUTH_URL = `https://www.tumblr.com/oauth/authorize?
  oauth_token=TOKEN123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `?
  oauth_token=TOKEN123&
  oauth_verifier=VERIFIER123
`.replace(/\s+/g, '');

const ACCESS_TOKEN_URL = 'https://www.tumblr.com/oauth/access_token';

const ACCESS_TOKEN_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="%2B%2BLptOJJpVD18Q376%2FyLUIF%2FNhw%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_token="TOKEN123",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
  body: 'oauth_verifier=VERIFIER123',
};

const ACCESS_TOKEN_RESPONSE = `
  oauth_token=TOKEN2123&
  oauth_token_secret=SECRET2123#_
`.replace(/\s+/g, '');

const USER_INFO_URL = 'https://api.tumblr.com/v2/user/info';

const USER_INFO_OPTS = {
  headers: {
    Authorization: `OAuth oauth_consumer_key="APPID123",
                          oauth_nonce="123ABC",
                          oauth_signature="HM1CrAVoeiZC7yECW9%2F0VB0d5cg%3D",
                          oauth_signature_method="HMAC-SHA1",
                          oauth_timestamp="1234567890",
                          oauth_token="TOKEN2123",
                          oauth_version="1.0"`.replace(/\n +/g, ' '),
  },
};

const USER_INFO_RESPONSE = {
  response: {
    user: {
      name: 'foo',
    },
  },
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [REQUEST_TOKEN_URL, REQUEST_TOKEN_OPTS, REQUEST_TOKEN_RESPONSE, 'get oauth token'],
  [ACCESS_TOKEN_URL, ACCESS_TOKEN_OPTS, ACCESS_TOKEN_RESPONSE, 'get access token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
