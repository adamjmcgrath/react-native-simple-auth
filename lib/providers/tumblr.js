/* eslint camelcase: "off" */
import {
  __,
  curry,
  identity,
  invoker,
  lensProp,
  merge,
  partial,
  path,
  pipeP,
  set,
} from 'ramda';
import {
  requestToken,
  accessToken,
  getHeaders,
} from '../utils/oauth1';
import {
  fromQueryString,
} from '../utils/uri';

const REQUEST_TOKEN = 'https://www.tumblr.com/oauth/request_token';
const AUTH = 'https://www.tumblr.com/oauth/authorize';
const ACCESS_TOKEN = 'https://www.tumblr.com/oauth/access_token';
const ME = 'https://api.tumblr.com/v2/user/info';

export const verifyCallback = identity;

export const authorize = ({ dance, request }, { appId, appSecret, callback }) =>
  pipeP(
    requestToken(REQUEST_TOKEN),
    ({ oauth_token, oauth_token_secret }) => pipeP(
      partial(dance, [`${AUTH}?oauth_token=${oauth_token}`]),
      fromQueryString,
      merge({ appId, appSecret, oauth_token_secret }),
      accessToken(ACCESS_TOKEN, request),
      merge({ appId, appSecret }),
    )(),
  )(request, appId, appSecret, callback);

export const identify = curry(
  (request, { appId, appSecret, oauth_token, oauth_token_secret }) => pipeP(
    partial(request, [ME, {
      headers: getHeaders(ME, {}, {}, appId, appSecret, 'GET', oauth_token, oauth_token_secret), // eslint-disable-line max-len
    }, {}]),
    invoker(0, 'json'),
    path(['response', 'user']),
    set(lensProp('user'), __, {}),
    set(lensProp('credentials'), { oauth_token, oauth_token_secret }),
  )(),
);
