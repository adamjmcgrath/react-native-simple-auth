import assert from 'assert';
import * as untappd from './untappd';
import DANCE from '../fixtures/untappd';
import * as test from '../platforms/test';
import login from '../login';

describe('Untappd', () => {
  before(() => {
    test.setup([], DANCE);
  });

  it('should authorize', () => {
    const untappdTest = login(untappd, test);
    return untappdTest({
      appId: 'APPID123',
    })
    .then((response) => {
      assert.equal(response.credentials.code, 'CODE123');
    });
  });
});
