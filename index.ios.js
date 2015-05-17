/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SimpleAuthWrapper = require('NativeModules').SimpleAuthWrapper;
var secrets = require('./secrets');

for (var provider in secrets) {
  SimpleAuthWrapper.configure(provider, secrets[provider], function() {});
}

var Profile = React.createClass({
  render: function() {
    console.log(this);
    return (
      <React.View style={styles.content}>
        <React.Image style={styles.pic} source={{uri: this.props.info.picture}} />
        <React.Text style={styles.header}>{this.props.info.name}</React.Text>
        <React.View style={styles.scroll}>
          <React.Text style={styles.mono}>{JSON.stringify(this.props.info, null, 4)}</React.Text>
        </React.View>
      </React.View>
    )
  }
});

var Login = React.createClass({
  render: function() {
    return (
      <React.View style={styles.content}>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#FFF', borderColor: '#CCC', borderWidth: 1}]}
          onPress={this.onBtnPressed.bind(this, 'google-web')}>
          <React.Text style={[styles.buttonText, {color: '#000'}]}>Google</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#3b5998'}]}
          onPress={this.onBtnPressed.bind(this, 'facebook')}>
          <React.Text style={styles.buttonText}>Facebook</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#48BBEC'}]}
          onPress={this.onBtnPressed.bind(this, 'twitter')}>
          <React.Text style={styles.buttonText}>Twitter</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#3F729B'}]}
          onPress={this.onBtnPressed.bind(this, 'instagram')}>
          <React.Text style={styles.buttonText}>Instagram</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#36465D'}]}
          onPress={this.onBtnPressed.bind(this, 'tumblr')}>
          <React.Text style={styles.buttonText}>Tumblr</React.Text>
        </React.TouchableHighlight>
        <React.TouchableHighlight
          style={[styles.button, {backgroundColor: '#0077B5'}]}
          onPress={this.onBtnPressed.bind(this, 'linkedin-web')}>
          <React.Text style={styles.buttonText}>LinkedIn</React.Text>
        </React.TouchableHighlight>
      </React.View>
    );
  },

  onBtnPressed: function(provider) {
    var _this = this;
    SimpleAuthWrapper.authorize(provider, function(error, credentials, info) {
      console.log(info);
      if (!error) {
        _this.props.navigator.push({
          title: provider,
          component: Profile,
          passProps: {info: info}
        });
      }
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
  },
  pic: {
    width: 100,
    height: 100
  },
  mono: {
    fontFamily: 'Menlo',
    paddingTop: 10
  },
  scroll: {
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: '#f2f2f2',
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  }
});

React.AppRegistry.registerComponent('ReactNativeSimpleAuth', () => ReactNativeSimpleAuth);
