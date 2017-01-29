import assert from 'assert';
import * as twitter from './twitter';
import { REQUESTS, DANCE } from '../fixtures/twitter';
import * as test from '../platforms/test';
import { setupForTesting } from '../utils/oauth1';
import login from '../login';

describe('Twitter', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
    setupForTesting('123ABC', 1234567890);
  });

  it('should login', () => {
    const twitterTest = login(twitter, test);
    return twitterTest({
      appId: 'APPID123',
      appSecret: 'APPSECRET123',
    })
    .then((user) => {
      assert.equal(user.user.name, 'foo');
      assert.equal(user.credentials.oauth_token, 'ACCESSTOKEN123');
      assert.equal(user.credentials.oauth_token_secret, 'ACCESSTOKENSECRET123');
    });
  });
});
