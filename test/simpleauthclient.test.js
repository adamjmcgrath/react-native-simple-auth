let expect = require('chai').use(require("sinon-chai")).expect;
let proxyquire = require('proxyquire');
let sinon = require('sinon');

describe('SimpleAuthClient', () => {

  let SimpleAuthClient;
  let configureSpy;
  let authorizeSpy;

  beforeEach(() => {
    configureSpy = sinon.spy();
    authorizeSpy = sinon.spy();

    SimpleAuthClient = proxyquire('../lib/simpleauthclient', {
      NativeModules: {
        SimpleAuthWrapper: {
          configure: configureSpy,
          authorize: authorizeSpy
        },
        '@noCallThru': true
      }
    });
  });

  it('should instantiate ok', () => {
    let simpleAuthClient = new SimpleAuthClient();
    expect(simpleAuthClient).to.be.ok;
  });

  it('should configure a single provider', () => {
    let simpleAuthClient = new SimpleAuthClient();
    simpleAuthClient.configure('foo', {bar: 'baz'});
    expect(configureSpy).to.have.been.calledWith('foo', {bar: 'baz'});
  });

  it('should configure a multiple providers', () => {
    let simpleAuthClient = new SimpleAuthClient();
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
    let simpleAuthClient = new SimpleAuthClient();
    simpleAuthClient.authorize('foo');
    expect(authorizeSpy).to.have.been.calledWith('foo');
  });

});