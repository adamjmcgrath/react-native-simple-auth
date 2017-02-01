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
} from '../utils/oauth2';
import {
  fromQueryString,
  toQueryString,
} from '../utils/uri';

const SCOPE = 'user';
const AUTH = 'https://github.com/login/oauth/authorize';
const TOKEN = 'https://github.com/login/oauth/access_token';
const ME = 'https://api.github.com/user';

const checkError = ifElse(
  has('error'),
  pipe(prop('error'), curry((e) => { throw new Error(e); })),
  identity,
);

const getUser = curry((request, credentials) => pipe(
  prop('access_token'),
  token => ({
    Authorization: `token ${token}`,
    'User-Agent': 'oauth',
  }),
  set(lensProp('headers'), __, {}),
  pipeP(
    partial(request, [ME]),
    invoker(0, 'json'),
    set(lensProp('user'), __, {}),
    set(lensProp('credentials'), credentials),
  ),
)(credentials));

export const authorize = ({ dance, request }, { appId, appSecret, callback }) =>
  pipeP(
    dance,
    fromQueryString,
    checkError,
    merge({ appId, appSecret, callback }),
  )(authorizationUrl(AUTH, appId, callback, SCOPE, 'code'));

export const identify = curry((request, { appId, appSecret, callback, code }) =>
  pipeP(
    partial(request, [TOKEN]),
    invoker(0, 'json'),
    checkError,
    getUser(request),
  )({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toQueryString({
      code,
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: callback,
    }),
  }),
);
