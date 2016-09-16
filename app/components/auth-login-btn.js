import Ember from 'ember';
import disableOnLogout from '../mixins/disable-on-logout';


export default Ember.Component.extend(disableOnLogout, {
  session: Ember.inject.service('session'),
  routing: Ember.inject.service('-routing'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
      let router = this.get('routing');
      router.transitionTo('login');
    },
    goToLogin: function() {
      this.transitionTo('login');
    }
  }
});
