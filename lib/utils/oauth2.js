import {
  curry,
} from 'ramda';

export const authorizationUrl = curry(
  (url, appId, callback, scope, responseType = 'token') =>
    `${url}?scope=${encodeURIComponent(scope)}&
      redirect_uri=${encodeURIComponent(callback)}&
      response_type=${responseType}&
      client_id=${appId}`.replace(/\s+/g, ''),
  );

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });
