import {
  curry,
} from 'ramda';

export const authorizationUrl = curry(
  (url, appId, callback, scope, authType = 'https', responseType = 'token') =>
    `${url}?scope=${encodeURIComponent(scope)}&
      redirect_uri=${encodeURIComponent(callback)}&
      response_type=${responseType}&
      auth_type=${authType}&
      client_id=${appId}`.replace(/\s+/g, ''),
  );

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });
