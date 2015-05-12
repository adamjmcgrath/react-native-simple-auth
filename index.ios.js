/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SimpleAuthWrapper = require('NativeModules').SimpleAuthWrapper;
var secrets = require('./secrets');

for (var provider in secrets) {
  SimpleAuthWrapper.configure(provider, secrets[provider]);
}

var Login = React.createClass({
  render: function() {
    return (
      <React.View style={styles.content}>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#ccc'}]}
          onPress={this.onSearchPressed.bind(this, 'google-web')}>
          <React.Text style={[styles.buttonText, {color: '#000'}]}>Google</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#3b5998'}]}
          onPress={this.onSearchPressed.bind(this, 'facebook')}>
          <React.Text style={styles.buttonText}>Facebook</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#48BBEC'}]}
          onPress={this.onSearchPressed.bind(this, 'twitter')}>
          <React.Text style={styles.buttonText}>Twitter</React.Text>
        </React.TouchableHighlight>
      </React.View>
    );
  },

  onSearchPressed: function(provider) {
    console.log(provider);
    SimpleAuthWrapper.authorize(provider, function(error, credentials, info) {
      console.log('resp:');
      console.log(error, credentials, info);
    });
  }
})

var ReactNativeSimpleAuth = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Simple Auth',
         component: Login
       }}/>
    );
  }
});

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: 80,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  }
});

React.AppRegistry.registerComponent('ReactNativeSimpleAuth', () => ReactNativeSimpleAuth);
