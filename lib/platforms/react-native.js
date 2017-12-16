import { Linking } from 'react-native'; // eslint-disable-line import/no-unresolved, max-len

let previousOnLinkChange;

export const dance = (authUrl) => {
  if (previousOnLinkChange) {
    Linking.removeEventListener('url', previousOnLinkChange);
  }

  return Linking.openURL(authUrl)
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
        previousOnLinkChange = undefined;
        handleUrl(url);
      };

      Linking.addEventListener('url', onLinkChange);

      previousOnLinkChange = onLinkChange;
    }));
};

export const request = fetch;
