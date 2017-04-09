import {
  __,
  curry,
  invoker,
  lensProp,
  partial,
  pipeP,
  replace,
  set,
  merge,
} from 'ramda';
import {
  authorizationUrl,
} from '../utils/oauth2';
import { fromQueryString } from '../utils/uri';

const SCOPE = 'email public_profile';
const AUTH = 'https://www.facebook.com/dialog/oauth';
const ME = 'https://graph.facebook.com/v2.8/me?';
const FIELDS = [
  'id',
  'name',
  'first_name',
  'last_name',
  'verified',
  'email',
  'location',
  'link',
];

export const authorize = (
  { dance, request },
  { appId, callback, scope = SCOPE, fields = FIELDS },
) => pipeP(
  dance,
  replace('#', '?'),
  fromQueryString,
  set(lensProp('credentials'), __, {}),
  merge({ fields }),
)(authorizationUrl(AUTH, appId, callback, scope));

export const identify = curry((request, { credentials, fields }) => pipeP(
  partial(
    request,
    [
      `${ME}` +
      `&access_token=${credentials.access_token}` +
      `&fields=${fields.join(',')}`,
      {},
    ],
  ),
  invoker(0, 'json'),
  set(lensProp('user'), __, {}),
  set(lensProp('credentials'), credentials),
)());
