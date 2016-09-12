import Ember from 'ember';
import disableOnLogout from '../mixins/disable-on-logout';

export default Ember.Component.extend(disableOnLogout, {
  newsletter: null,

  actions: {
    subscribe() {
      this.sendAction('subscribe', this.get('newsletter'));
    },
    unSubscribe() {
      this.sendAction('unSubscribe', this.get('newsletter'));
    }
  }
});
