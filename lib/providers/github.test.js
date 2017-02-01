import assert from 'assert';
import * as google from './github';
import { REQUESTS, DANCE } from '../fixtures/github';
import * as test from '../platforms/test';
import login from '../login';

describe('GitHub', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const googleTest = login(google, test);
    return googleTest({
      appId: 'APPID123',
      appSecret: 'SECRET123',
    })
      .then((user) => {
        assert.equal(user.user.id, 123456);
        assert.equal(user.user.login, 'username');
        assert.equal(user.user.email, 'foo@gmail.com');
        assert.equal(user.credentials.access_token, 'ACCESS123');
      });
  });
});
