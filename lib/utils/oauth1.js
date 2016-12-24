import {
  tap,
  curry,
} from 'ramda';
import signature, {
  getNonce,
  getNow,
} from './signature';
import {
  fromQueryString,
  toQueryString,
  encode,
} from './uri';

let testNonce;
let testNow;

const assert = (err, test) => {
  if (!test) {
    throw new Error(err);
  }
};

export const verifyCallback = resp =>
  assert('Unconfirmed callback', resp.oauth_callback_confirmed === 'true');

export const getHeaders = (url, params, data, consumerKey, consumerSecret,
                           method, oauthToken = '', oauthSecret = '') => {
  const nonce = testNonce || getNonce(32);
  const now = testNow || getNow();
  const sig = signature({
    url,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthSecret,
    params,
    method,
    data,
    nonce,
    now,
  });

  const header = `OAuth oauth_consumer_key="${encode(consumerKey)}",
    oauth_nonce="${encode(nonce)}",
    oauth_signature="${encode(sig)}",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="${encode(now)}",
    ${oauthToken && 'oauth_token="'}${oauthToken}${oauthToken && '",'}
    oauth_version="1.0"`.replace(/\n? +\n? */g, ' ');
  return { Authorization: header };
};

export const accessToken = curry((
  accessTokenUrl, request,
  { appId, appSecret, oauth_token, oauth_token_secret, oauth_verifier },
) => {
  const data = { oauth_verifier };
  const headers = Object.assign(
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    getHeaders(accessTokenUrl, {}, data, appId, appSecret, 'POST',
      oauth_token, oauth_token_secret));
  const opts = {
    method: 'POST',
    headers,
    body: `oauth_verifier=${oauth_verifier}`, // eslint-disable-line camelcase
  };

  return request(accessTokenUrl, opts)
    .then(resp => resp.text())
    .then(fromQueryString);
});

export const requestToken = curry(
  (requestTokenUrl, request, appId, appSecret, callback) => {
    const params = {
      oauth_callback: callback,
    };
    const headers = getHeaders(
      requestTokenUrl, params, {}, appId, appSecret, 'POST',
    );
    const url = `${requestTokenUrl}?${toQueryString(params)}`;
    return request(url, { method: 'POST', headers })
      .then(resp => resp.text())
      .then(fromQueryString)
      .then(tap(verifyCallback));
  },
);

export const setupForTesting = (nonce, now) => {
  testNonce = nonce;
  testNow = now;
};
