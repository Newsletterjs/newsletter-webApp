import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel () {
    let token = this.get('session.data.authenticated.token');

    if (!token) {
      return {};
    }

    return Ember.RSVP.hash({
      // preload current user subscriptions:
      loadSubs: Ember.$.ajax({
        url: ENV.API_HOST + '/all-subscriptions',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'JWT '+token
        }
      })
      .then( (output)=> {
        return this.store.push(output);
      })
    });
  },
  model () {
    return Ember.RSVP.hash({
      mySubscriptions: this.get('store').peekAll('newsletter-subscribers')
    });
  }
});
