/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'newsletter-webApp',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: '/',
    authorizer: 'authorizer:token'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV['API_HOST'] + '/auth/jwt/authenticate',
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'JWT ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: false,
    // serverTokenRefreshEndpoint: '/api/token-refresh/',
    // tokenExpireName: 'exp',
    refreshLeeway: 0,
    timeFactor: 1000  // example - set to "1000" to convert incoming seconds to milliseconds.
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API_HOST = 'http://localhost:4040';

    ENV['ember-simple-auth-token'].serverTokenEndpoint = ENV['API_HOST'] + '/auth/jwt/authenticate';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }


  return ENV;
};
