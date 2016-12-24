import {
  __,
  adjust,
  binary,
  compose,
  concat,
  curry,
  divide,
  flip,
  join,
  keys,
  merge,
  partial,
  pipe,
  reduce,
  times,
  toUpper,
} from 'ramda';
import hmacsha1 from 'hmacsha1';
import { toQueryString, encode } from './uri';

// Map arguments to OAuth keys.
const OAUTH_KEYS = {
  consumerKey: 'oauth_consumer_key',
  signatureMethod: 'oauth_signature_method',
  oauthToken: 'oauth_token',
  version: 'oauth_version',
  nonce: 'oauth_nonce',
  now: 'oauth_timestamp',
};

// Create a random alphanumeric string of a given length.
export const getNonce = pipe(
  times(
    partial(
      chars => chars[Math.floor(Math.random() * chars.length)],
      ['0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    ),
  ),
  join(''),
);

// Return the current timestamp in seconds
export const getNow = pipe(
  Date.now,
  flip(divide)(1000),
  Math.floor,
);

// Join key items with an ampersand and hash with given data.
const hash = pipe(
  join('&'),
  curry(binary(hmacsha1)),
);

// Rename an objects keys and remove unknown keys.
const renameKeys = curry((keysMap, obj) => reduce((acc, key) => {
  const ret = acc;
  if (obj[key]) {
    ret[keysMap[key] || key] = obj[key];
  }
  return ret;
}, {}, keys(keysMap)));

// Rename an objects OAuth keys.
const renameOAuthKeys = renameKeys(OAUTH_KEYS);

// Prepend the method and url to the base string.
const prependRequest = pipe(
  adjust(toUpper, 0),
  adjust(compose(concat(__, '&'), encode), 1),
  join('&'),
  concat,
);

// Merge 2 objects into a given object.
const mergeParams = compose(merge, merge);

// Create an OAuth 1.0 signature.
export default ({
  url,
  consumerKey,
  consumerSecret,
  oauthToken = '',
  oauthSecret = '',
  params = {},
  data = {},
  method = 'POST',
  version = '1.0',
  signatureMethod = 'HMAC-SHA1',
  nonceSize = 32,
  nonce = getNonce(nonceSize),
  now = getNow(),
}) => pipe(
    renameOAuthKeys,
    mergeParams(params, data),
    toQueryString,
    encode,
    prependRequest([method, url]),
    hash([consumerSecret, oauthSecret]),
  )({ consumerKey, signatureMethod, oauthToken, version, nonce, now });
