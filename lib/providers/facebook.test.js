import assert from 'assert';
import * as facebook from './facebook';
import { REQUESTS, DANCE } from '../fixtures/facebook';
import * as test from '../platforms/test';
import login from '../login';

describe('Facebook', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const facebookTest = login(facebook, test);
    return facebookTest({
      appId: 'APPID123',
    })
    .then((user) => {
      assert.equal(user.user.id, 'USER123');
      assert.equal(user.user.name, 'foo');
      assert.equal(user.user.email, 'foo@gmail.com');
      assert.equal(user.credentials.access_token, 'ACCESSTOKEN123');
    });
  });
});
