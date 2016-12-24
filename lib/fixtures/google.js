/* eslint max-len: "off" */

const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?
  scope=email%20profile&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=code&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `?
  code=CODE123&
  token_type=Bearer&
  expires_in=3600
`.replace(/\s+/g, '');

const TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';

const TOKEN_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'client_id=APPID123&code=CODE123&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback',
};

const TOKEN_RESPONSE = {
  access_token: 'ACCESSTOKEN123',
  expires_in: 3920,
  token_type: 'Bearer',
  refresh_token: 'REFRESHTOKEN123',
};

const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const USER_INFO_OPTS = {
  headers: {
    Authorization: 'Bearer ACCESSTOKEN123',
  },
};

const USER_INFO_RESPONSE = {
  id: 'USER123',
  email: 'foo@gmail.com',
  verified_email: true,
  name: 'foo',
  given_name: 'Foo',
  family_name: 'Bar',
  link: 'https://plus.google.com/1234567890',
  picture: 'https://lh4.googleusercontent.com/ABC123/photo.jpg',
  gender: 'male',
  locale: 'en',
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [TOKEN_URL, TOKEN_OPTS, TOKEN_RESPONSE, 'verify token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
