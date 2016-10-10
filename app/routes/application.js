import Ember from 'ember';
import ENV from "../config/environment";

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  beforeModel () {
    let token = this.get('session.session.content.authenticated.access_token');

    if (!token) {
      return {};
    }

    return Ember.RSVP.hash({
      // preload current user subscriptions:
      loadSubs: Ember.$.ajax({
        url: ENV.API_HOST + '/all-subscriptions',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'Basic '+token
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
