import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),

  disabled: false,

  listen: function() {
    if (this.get('session.isAuthenticated')) {
      this.set('disabled', false);
    }

    this.get('session').on('authenticationSucceeded', this, 'enableComponent');
    this.get('session').on('invalidationSucceeded', this, 'disableComponent');
  }.on('init'),

  cleanup: function() {
    this.get('session').off('authenticationSucceeded', this, 'enableComponent');
    this.get('session').off('invalidationSucceeded', this, 'disableComponent');
  }.on('willDestroyElement'),

  enableComponent: function() {
    this.set('disabled', false);
  },
  disableComponent: function() {
    this.set('disabled', true);
  },
});
