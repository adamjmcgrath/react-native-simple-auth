const AUTH_URL = `https://www.facebook.com/dialog/oauth?
  scope=email%20public_profile&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=token&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `fb0123456789://authorize#
  access_token=ACCESSTOKEN123&
  expires_in=12345
`.replace(/\s+/g, '');

const USER_INFO_URL = `https://graph.facebook.com/v2.8/me?
  fields=id,name,first_name,last_name,verified,email,location,link&
  access_token=ACCESSTOKEN123
`.replace(/\s+/g, '');

const USER_INFO_RESPONSE = {
  id: 'USER123',
  name: 'foo',
  email: 'foo@gmail.com',
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [USER_INFO_URL, {}, USER_INFO_RESPONSE, 'get user info'],
];
