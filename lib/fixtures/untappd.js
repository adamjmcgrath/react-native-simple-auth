/* eslint max-len: "off" */

const AUTHENTICATE_URL = `https://untappd.com/oauth/authenticate?
  scope=&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=code&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `?
  code=CODE123
`.replace(/\s+/g, '');

export default [AUTHENTICATE_URL, DANCE_CALLBACK];
