import { Linking, AppState } from 'react-native'; // eslint-disable-line import/no-unresolved, max-len
import SafariView from 'react-native-safari-view';

let appStateTimeout;
let previousLinkingCallback;
let previousAppStateCallback;

const cleanup = () => {
  clearTimeout(appStateTimeout);

  if (previousLinkingCallback) {
    Linking.removeEventListener('url', previousLinkingCallback);
    previousLinkingCallback = null;
  }

  if (previousAppStateCallback) {
    AppState.removeEventListener('change', previousAppStateCallback);
    previousAppStateCallback = null;
  }
};

const openURL = (url) => {
  // Use SafariView on iOS
  if (Platform.OS === 'ios') {
    return SafariView.show({
      url: url,
      fromBottom: true,
    });
  }
  // Or Linking.openURL on Android
  else {
    return Linking.openURL(url);
  }
};

export const dance = (authUrl) => {
  cleanup();

  return openURL(authUrl)
    .then(() => new Promise((resolve, reject) => {
      const handleUrl = (url) => {
        if (!url || url.indexOf('fail') > -1) {
          reject(url);
        } else {
          resolve(url);
        }
      };

      const linkingCallback = ({ url }) => {
        cleanup();
        handleUrl(url);
      };

      Linking.addEventListener('url', linkingCallback);
      previousLinkingCallback = linkingCallback;

      const appStateCallback = (state) => {
        // Give time for Linking event to fire.
        appStateTimeout = setTimeout(() => {
          if (state === 'active') {
            cleanup();
            reject('cancelled');
          }
        }, 100);
      };

      AppState.addEventListener('change', appStateCallback);
      previousAppStateCallback = appStateCallback;
    }));
};

export const request = fetch;
