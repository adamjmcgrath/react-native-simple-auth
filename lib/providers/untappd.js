import {
  curry,
  has,
  identity,
  ifElse,
  merge,
  pipe,
  pipeP,
  prop,
} from 'ramda';
import {
  authorizationUrl,
} from '../utils/oauth2';
import {
  fromQueryString,
} from '../utils/uri';

const SCOPE = '';
const AUTH = 'https://untappd.com/oauth/authenticate';

const checkError = ifElse(
  has('error'),
  pipe(prop('error'), curry((e) => { throw new Error(e); })),
  identity,
);

// eslint-disable-next-line import/prefer-default-export
export const authorize = (
  { dance },
  { appId, callback, scope = SCOPE }) =>
  pipeP(
    dance,
    fromQueryString,
    checkError,
    merge({ appId, callback }),
  )(authorizationUrl(AUTH, appId, callback, scope, 'code'));

export const identify = curry((request, { code }) => ({
  credentials: {
    code,
  },
}));
