import assert from 'assert';
import signature from './signature';

describe('Signature', () => {
  it('should calculate the oauth signature', () => {
    const url = 'https://api.twitter.com/1/statuses/update.json';
    const params = { include_entities: true };
    const consumerKey = 'xvz1evFS4wEEPTGEFPHBog';
    const consumerSecret = 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw';
    const oauthToken = '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb';
    const oauthSecret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';
    const data = {
      status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
    };
    const nonce = 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg';
    const now = 1318622958;

    const expected = 'tnnArxj06cWHq44gCs1OSKk/jLY=';
    const actual = signature({
      url,
      params,
      consumerKey,
      consumerSecret,
      oauthToken,
      oauthSecret,
      data,
      nonce,
      now,
    });

    assert.equal(actual, expected);
  });
});
