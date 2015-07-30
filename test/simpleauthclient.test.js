let expect = require('chai').use(require("sinon-chai")).expect;
let proxyquire = require('proxyquire');
let sinon = require('sinon');

describe('SimpleAuthClient', () => {

  let configureSpy;
  let authorizeSpy;
  let simpleAuthClient;

  before(() => {
    configureSpy = sinon.spy();
    authorizeSpy = sinon.spy();
    simpleAuthClient = proxyquire('../lib/simpleauthclient', {
      'react-native': {
        NativeModules: {
          SimpleAuthWrapper: {
            configure: configureSpy,
            authorize: authorizeSpy
          }
        },
        '@noCallThru': true
      }
    });
  });

  afterEach(() => {
    configureSpy.reset();
    authorizeSpy.reset();
  });

  after(() => {
    configureSpy = null;
    authorizeSpy = null;
    simpleAuthClient = null;
  });

  it('should instantiate ok', () => {
    expect(simpleAuthClient).to.be.ok;
  });

  it('should configure a single provider', () => {
    simpleAuthClient.configure('foo', {bar: 'baz'});
    expect(configureSpy).to.have.been.calledWith('foo', {bar: 'baz'});
  });

  it('should configure a multiple providers', () => {
    simpleAuthClient.configure({
      foo: {
        bar: 'baz'
      },
      qux: {
        quux: 'quuux'
      }
    });
    expect(configureSpy).to.have.been.calledTwice;
    expect(configureSpy.firstCall).to.have.been.calledWith('foo', {bar: 'baz'});
    expect(configureSpy.secondCall).to.have.been.calledWith('qux', {quux: 'quuux'});
  });

  it('should authorize the given provider', () => {
    simpleAuthClient.authorize('foo');
    expect(authorizeSpy).to.have.been.calledWith('foo');
  });

});