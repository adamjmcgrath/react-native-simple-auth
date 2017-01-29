/* eslint camelcase: "off" */
import {
  __,
  curry,
  invoker,
  lensProp,
  merge,
  partial,
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


const REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token';
const AUTH = 'https://api.twitter.com/oauth/authenticate';
const ACCESS_TOKEN = 'https://api.twitter.com/oauth/access_token';
const VERIFY_CREDENTIALS =
  'https://api.twitter.com/1.1/account/verify_credentials.json';

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
    partial(request, [VERIFY_CREDENTIALS, {
      headers: getHeaders(VERIFY_CREDENTIALS, {}, {}, appId, appSecret, 'GET', oauth_token, oauth_token_secret), // eslint-disable-line max-len
    }, {}]),
    invoker(0, 'json'),
    set(lensProp('user'), __, {}),
    set(lensProp('credentials'), { oauth_token, oauth_token_secret }),
  )(),
);

