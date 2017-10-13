import { Linking } from 'react-native'; // eslint-disable-line import/no-unresolved, max-len
import SafariView from "react-native-safari-view";

function openURL(authUrl)
{
  if (Platform.OS === 'ios')
  {
    return SafariView.show({
      url: authUrl,
      fromBottom: true
    });
  } 
  else
    return Linking.openURL(authUrl);
}

export const dance = authUrl => openURL(authUrl)
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
