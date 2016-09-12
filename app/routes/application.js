import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model (params) {
    let token = this.get('session.data.authenticated.token');

    if (!token) {
      return {};
    }

    return Ember.RSVP.hash({
      user: this.store.query('user', {
        username: params.username
      })
      .then( (r)=> {
        if (r.content[0] && r.content[0].id) {
          return this.store.peekRecord('user', r.content[0].id);
        } else {
          return null;
        }
      }),
      newsletterSubscribers: Ember.$.ajax({
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
  }
});
