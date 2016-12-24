import { Linking } from 'react-native'; // eslint-disable-line import/no-unresolved, max-len

export const dance = authUrl => Linking.openURL(authUrl)
  .then(() => new Promise((resolve, reject) => {
    const handleUrl = (url) => {
      if (!url || url.indexOf('fail') > -1) {
        reject(url);
      } else {
        resolve(url);
      }
    };

    const onLinkChange = ({ url }) => {
      Linking.removeEventListener('url', onLinkChange);
      handleUrl(url);
    };

    Linking.addEventListener('url', onLinkChange);
  }));

export const request = fetch;
