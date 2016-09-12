import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model (params) {
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
      newsletters: this.get('store').query('newsletter', {
        username: params.username
      })
    });
  },

  actions: {
    subscribe: function subscribe(newsletter) {
      let token = this.get('session.data.authenticated.token');

      let url = ENV.API_HOST + '/newsletter/' + newsletter.get('id') + '/subscribe';

      Ember.$.ajax({
        url: url,
        type: 'post',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'JWT '+token
        }
      })
      .then( (output)=> {
        let sub = this.get('store').push(output);
        this.set('model.subscription', sub);

        return sub;
      });

    },
    unSubscribe: function unSubscribe(newsletter) {
      let token = this.get('session.data.authenticated.token');

      let url = ENV.API_HOST + '/newsletter/' + newsletter.get('id') + '/un-subscribe';

      Ember.$.ajax({
        url: url,
        type: 'post',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'JWT '+token
        }
      })
      .then( (output)=> {
        // remove subscription from route and store after success
        let sub = this.get('model.subscription');
        this.set('model.subscription', null);
        sub.unloadRecord();

        return output;
      });
    }
  }
});
