import assert from 'assert';

let requests;
let danceFixture;

export const request = (url, opts = {}) => {
  const [expectedUrl, expectedOpts, response, msg] = requests.shift();
  assert.equal(url, expectedUrl, `url for ${msg} request`);
  assert.deepEqual(opts, expectedOpts, `opts for ${msg} request`);
  return Promise.resolve({
    json() {
      return Promise.resolve(response);
    },
    text() {
      return Promise.resolve(response);
    },
  });
};

export const dance = (url) => {
  const [expectedUrl, response] = danceFixture;
  assert.equal(url, expectedUrl, 'authorization url for dance');
  return Promise.resolve(response);
};

export const setup = (REQUESTS, DANCE) => {
  requests = REQUESTS.slice(0);
  danceFixture = DANCE.slice(0);
};

export const opts = {
  callback: 'http://localhost:3000/callback',
};
