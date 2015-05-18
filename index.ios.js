/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let simpleAuthClient = require('./lib/simpleauthclient');
let secrets = require('./secrets');

class Profile extends React.Component {

  constructor(props) {
    props.token = props.info.token;
    delete props.info.token;
    super(props);
    this.state = {
      name: this.getName(props.provider),
      picture: this.getPictureLink(props.provider)
    };
  }

  render() {
    return (
      <React.View style={styles.content}>
        <React.Image style={styles.pic} source={{uri: this.state.picture }} />
        <React.Text style={styles.header}>{this.state.name}</React.Text>
        <React.View style={styles.scroll}>
          <React.Text style={styles.mono}>{JSON.stringify(this.props.info, null, 4)}</React.Text>
        </React.View>
      </React.View>
    )
  }

  getName(provider) {
    switch (provider) {
      case 'instagram':
        return this.props.info.data.full_name;
      case 'linkedin-web':
        return `${this.props.info.firstName} ${this.props.info.lastName}`;
      default:
        return this.props.info.name
    }
  }

  getPictureLink(provider) {
    switch (provider) {
      case 'google-web':
        return this.props.info.picture;
      case 'facebook':
        return `http://graph.facebook.com/${this.props.info.id}/picture?type=square`
      case 'twitter':
        return this.props.info.profile_image_url;
      case 'instagram':
        return this.props.info.data.profile_picture;
      case 'tumblr':
        return `http://api.tumblr.com/v2/blog/${this.props.info.name}.tumblr.com/avatar/96`;
      case 'linkedin-web':
        var profileUrl = `https://api.linkedin.com/v1/people/~:(picture-url)?oauth2_access_token=${this.props.token}&format=json`
        fetch(profileUrl)
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ picture: responseJson.pictureUrl });
          });
        return '';
    }
  }

};

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    simpleAuthClient.configure(secrets);
  }

  render() {
    return (
      <React.View style={styles.content}>
        {
          this.state.loading ? null : this.props.authProviders.map(provider => {
            return (
              <React.TouchableHighlight
                style={[styles.button, styles[provider]]}
                onPress={this.onBtnPressed.bind(this, provider)}>
                <React.Text style={[styles.buttonText]}>{provider.split('-')[0]}</React.Text>
              </React.TouchableHighlight>
            );
          })
        }
        <React.ActivityIndicatorIOS
            animating={this.state.loading}
            style={[styles.loading]}
            size='large' />
      </React.View>
    );
  }

  onBtnPressed(provider) {
    this.setState({
      loading: true
    });
    simpleAuthClient.authorize(provider).then(info => {
      this.props.navigator.push({
        title: provider,
        component: Profile,
        passProps: {
          info: info,
          provider: provider
        }
      });
      this.setState({
        loading: false
      });
    });
  }

};

class ReactNativeSimpleAuth extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Simple Auth',
          component: Login,
          passProps: {
            authProviders: [
              'google-web',
              'facebook',
              'twitter',
              'instagram',
              'tumblr',
              'linkedin-web'
            ]
          }
        }}/>
    );
  }
};

let styles = React.StyleSheet.create({
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
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  'google-web': {
    backgroundColor: '#ccc'
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  twitter: {
    backgroundColor: '#48BBEC'
  },
  instagram: {
    backgroundColor: '#3F729B'
  },
  tumblr: {
    backgroundColor: '#36465D'
  },
  'linkedin-web': {
    backgroundColor: '#0077B5'
  }
});

React.AppRegistry.registerComponent('ReactNativeSimpleAuth', () => ReactNativeSimpleAuth);
