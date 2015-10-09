# react-native-simple-auth [![Build Status](https://travis-ci.org/adamjmcgrath/react-native-simple-auth.svg?branch=chore%2Frelease-tasks)](https://travis-ci.org/adamjmcgrath/react-native-simple-auth)
## [SimpleAuth iOS](https://github.com/calebd/SimpleAuth) wrapper for React Native

  * [Screencast](#screencast)
  * [Install](#install)
  * [Usage](#usage)
  * [License](#license)
  * [Thanks](#thanks)

Screencast
==========

![Screencast](https://raw.githubusercontent.com/adamjmcgrath/react-native-simple-auth/master/screencast.gif)

Install
=======
1. Install react native and make sure it works.  There are currently two supported approaches for installing React-Native, [npm](https://facebook.github.io/react-native/docs/getting-started.html#quick-start) or [CocoaPods](https://cocoapods.org/pods/React).  Users have found the `npm` approach more stable for this library.  
2. `npm install react-native-simple-auth`
3. In XCode, in the project navigator right click `Libraries` ➜ `Add Files to [your project's name]`
4. Go to `node_modules` ➜ `react-native-simple-auth`➜ iOS and add `SimpleAuthWrapper.h` and `SimpleAuthWrapper.m` 
5. Go to your project's root directory and add a Podfile similar to [this example](https://github.com/adamjmcgrath/react-native-simple-auth/blob/master/Podfile).
  * You may need to tell the podfile where to find your xcode project by adding the following to the podfile:
    ```xcodeproj './path/to/your/.xcodeproj/project'```
6. Install CocoaPods https://guides.cocoapods.org/using/getting-started.html
7. Run `pod install`

If you encounter problems building the project after this, the [following install tips](https://github.com/adamjmcgrath/react-native-simple-auth/issues/14) may be of help.

Usage
=====

Create a configuration object for each of the providers you want to authorize with (required keys are in parenthesis):

 - google-web (`client_id`, `client_secret`)
 - facebook (`app_id`)
 - twitter (`consumer_key`, `consumer_secret`)
 - instagram (`client_id`, `redirect_uri`)
 - tumblr (`consumer_key`, `consumer_secret`)
 - linkedin-web (`client_id`, `client_secret`, `redirect_uri`)

See [secrets.example.js](/secrets.example.js).

[Other providers supported by SimpleAuth](https://github.com/calebd/SimpleAuth#simpleauth) may work, but haven't been tested.

Create an instance of the SimpleAuthWrapper library:

```javascript
let simpleAuthClient = require('react-native-simple-auth');
```

Configure the library with a single provider:

```javascript
simpleAuthClient.configure('twitter', {
  consumer_key: 'KEY',
  consumer_secret: 'SECRET'
}).then(() => {
  // Twitter is configured.
})
```

Or multiple providers:

```javascript
simpleAuthClient.configure({
  twitter: {
    consumer_key: 'KEY',
    consumer_secret: 'SECRET'
  },
  facebook: {
    app_id: 'ID'
  }
}).then(() => {
  // Twitter & Facebook are configured.
});
```

Then authorize each provider:

```javascript
simpleAuthClient.authorize('twitter').then((info) => {
  let token = info.token;
  let name = info.name;
}).catch((error) => {
  let errorCode = error.code;
  let errorDescription = error.description;
});
```

License
=======

react-native-simple-auth is released under the MIT license.

Thanks
======

- [calebd](https://github.com/calebd) for the code review and [SimpleAuth](https://github.com/calebd/SimpleAuth) library

