import assert from 'assert';
import * as tumblr from './tumblr';
import { REQUESTS, DANCE } from '../fixtures/tumblr';
import * as test from '../platforms/test';
import { setupForTesting } from '../utils/oauth1';
import login from '../login';

describe('Tumblr', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
    setupForTesting('123ABC', 1234567890);
  });

  it('should login', () => {
    const tumblrTest = login(tumblr, test);
    return tumblrTest({
      appId: 'APPID123',
      appSecret: 'APPSECRET123',
    })
    .then((user) => {
      assert.equal(user.user.name, 'foo');
      assert.equal(user.credentials.oauth_token, 'TOKEN2123');
      assert.equal(user.credentials.oauth_token_secret, 'SECRET2123');
    });
  });
});
