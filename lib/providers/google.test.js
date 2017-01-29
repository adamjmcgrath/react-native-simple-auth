import assert from 'assert';
import * as google from './google';
import { REQUESTS, DANCE } from '../fixtures/google';
import * as test from '../platforms/test';
import login from '../login';

describe('Google', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const googleTest = login(google, test);
    return googleTest({
      appId: 'APPID123',
    })
    .then((user) => {
      assert.equal(user.user.id, 'USER123');
      assert.equal(user.user.name, 'foo');
      assert.equal(user.user.email, 'foo@gmail.com');
      assert.equal(user.credentials.access_token, 'ACCESSTOKEN123');
      assert.equal(user.credentials.refresh_token, 'REFRESHTOKEN123');
    });
  });
});
