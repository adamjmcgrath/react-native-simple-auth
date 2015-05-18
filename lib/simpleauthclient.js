/**
 * Simple Auth Client.
 */
'use strict';

let SimpleAuthWrapper = require('NativeModules').SimpleAuthWrapper;

class SimpleAuthClient {

  _configure(provider, config) {
    return new Promise(function(resolve) {
      SimpleAuthWrapper.configure(provider, config, resolve);
    });
  }

  configure(provider, config) {
    // Bug with rest parameters in React https://github.com/facebook/react-native/issues/853
    if (arguments.length > 1) {
      return this._configure(...arguments);
    } else {
      let config = arguments[0];
      return Promise.all(Object.keys(config).map(provider => {
        return this._configure(provider, config[provider]);
      }));
    }
  }

  authorize(provider) {
    return new Promise((resolve, reject) => {
      SimpleAuthWrapper.authorize(provider, function(error, token, info) {
        if (error) {
          reject(error);
        } else {
          info.token = token;
          resolve(info)
        }
      });
    });
  }

}

module.exports = new SimpleAuthClient();
