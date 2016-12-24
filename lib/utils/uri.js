import {
  fromPairs,
  join,
  map,
  pipe,
  prop,
  replace,
  sortBy,
  split,
  toPairs,
} from 'ramda';

const sortPairs = pipe(
  sortBy(prop(1)),
  sortBy(prop(0)),
);

// For RFC 3986 Compliant URI Encoding.
export const encode = pipe(
  encodeURIComponent,
  replace(/!/g, '%21'),
  replace(/'/g, '%27'),
  replace(/\(/g, '%28'),
  replace(/\)/g, '%29'),
  replace(/\*/g, '%2A'),
);

// Convert an object to a (sorted) query string.
export const toQueryString = pipe(
  toPairs,
  map(map(encode)),
  sortPairs,
  map(join('=')),
  join('&'),
);

// Convert a query string to an object.
export const fromQueryString = pipe(
  replace(/.*\?/, ''),
  replace(/#.*/, ''),
  split('&'),
  map(split('=')),
  fromPairs,
);
