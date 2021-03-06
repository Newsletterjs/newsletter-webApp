import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user', { path: ':username' }, function() {
    this.route('newsletter', { path: ':id' }, function() {
      this.route('unsubscribe');
    });
  });

  this.route('search');

  this.route('login');
  this.route('logout');
});

export default Router;