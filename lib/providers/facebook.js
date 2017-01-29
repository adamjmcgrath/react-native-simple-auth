import {
  __,
  curry,
  equals,
  identity,
  ifElse,
  invoker,
  lensProp,
  merge,
  partial,
  pathSatisfies,
  pipeP,
  replace,
  set,
} from 'ramda';
import {
  authorizationUrl,
} from '../utils/oauth2';
import { fromQueryString } from '../utils/uri';

const SCOPE = 'email public_profile';
const AUTH = 'https://www.facebook.com/dialog/oauth';
const DEBUG_TOKEN = 'https://graph.facebook.com/debug_token';
const ME = 'https://graph.facebook.com/v2.8/me?fields=' +
           'id,name,first_name,last_name,verified,email,location,link';

const checkAppId = curry((appId, obj) => ifElse(
  pathSatisfies(equals(appId), ['data', 'app_id']),
  identity,
  () => { throw new Error('AppIds don\'t match.'); },
)(obj));

export const authorize = ({ dance, request }, { appId, callback }) => pipeP(
  dance,
  replace('#', '?'),
  fromQueryString,
  merge({ appId }),
)(authorizationUrl(AUTH, appId, callback, SCOPE));

export const identify = curry((request, { appId, ...credentials }) => pipeP(
  partial(request, [`${DEBUG_TOKEN}?input_token=${credentials.access_token}&access_token=${credentials.access_token}`, {}]),  // eslint-disable-line max-len
  invoker(0, 'json'),
  checkAppId(appId),
  partial(request, [`${ME}&access_token=${credentials.access_token}`, {}]),
  invoker(0, 'json'),
  set(lensProp('user'), __, {}),
  set(lensProp('credentials'), credentials),
)());
