/* eslint max-len: 'off' */

const AUTH_URL = `https://github.com/login/oauth/authorize?
  scope=user&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=code&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `http://localhost:3000/callback?
  code=CODE123
`.replace(/\s+/g, '');

const TOKEN_URL = 'https://github.com/login/oauth/access_token';

const TOKEN_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  body: 'client_id=APPID123&client_secret=SECRET123&code=CODE123&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback',
};

const TOKEN_RESPONSE = {
  access_token: 'ACCESS123',
  scope: 'user',
  token_type: 'bearer',
};

const USER_INFO_URL = 'https://api.github.com/user';

const USER_INFO_OPTS = {
  headers: {
    Authorization: 'token ACCESS123',
    'User-Agent': 'oauth',
  },
};

const USER_INFO_RESPONSE = {
  login: 'username',
  id: 123456,
  avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/username',
  type: 'User',
  site_admin: false,
  name: 'User',
  company: null,
  blog: null,
  location: 'Earth',
  email: 'foo@gmail.com',
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [TOKEN_URL, TOKEN_OPTS, TOKEN_RESPONSE, 'verify token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
