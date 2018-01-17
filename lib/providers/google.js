import {
  __,
  curry,
  has,
  identity,
  ifElse,
  invoker,
  lensProp,
  merge,
  partial,
  pipe,
  pipeP,
  prop,
  set,
} from 'ramda';
import {
  authorizationUrl,
  getHeaders,
} from '../utils/oauth2';
import {
  fromQueryString,
  toQueryString,
} from '../utils/uri';

const SCOPE = 'email profile offline';
const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN = 'https://www.googleapis.com/oauth2/v4/token';
const ME = 'https://www.googleapis.com/oauth2/v2/userinfo';

const checkError = ifElse(
  has('error'),
  pipe(prop('error'), curry((e) => { throw new Error(e); })),
  identity,
);

const getUser = curry((request, credentials) => pipe(
  prop('access_token'),
  getHeaders,
  set(lensProp('headers'), __, {}),
  pipeP(
    partial(request, [ME]),
    invoker(0, 'json'),
    set(lensProp('user'), __, {}),
    set(lensProp('credentials'), credentials),
  ),
)(credentials));

export const authorize = ({ dance, request }, { appId, callback, scope = SCOPE }) =>
  pipeP(
    dance,
    fromQueryString,
    checkError,
    merge({ appId, callback }),
  )(authorizationUrl(AUTH, appId, callback, scope, 'code'));

export const identify = curry((request, { appId, callback, code }) =>
  pipeP(
    partial(request, [TOKEN]),
    invoker(0, 'json'),
    checkError,
    getUser(request),
  )({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toQueryString({
      code,
      client_id: appId,
      redirect_uri: callback,
      grant_type: 'authorization_code',
    }),
  }),
);
