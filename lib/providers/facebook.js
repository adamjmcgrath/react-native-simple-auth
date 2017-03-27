import {
  __,
  curry,
  invoker,
  lensProp,
  partial,
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
const ME = 'https://graph.facebook.com/v2.8/me?fields=' +
           'id,name,first_name,last_name,verified,email,location,link';

export const authorize = ({ dance, request }, { appId, callback }) => pipeP(
  dance,
  replace('#', '?'),
  fromQueryString,
)(authorizationUrl(AUTH, appId, callback, SCOPE));

export const identify = curry((request, credentials) => pipeP(
  partial(request, [`${ME}&access_token=${credentials.access_token}`, {}]),
  invoker(0, 'json'),
  set(lensProp('user'), __, {}),
  set(lensProp('credentials'), credentials),
)());
