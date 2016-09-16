import Ember from 'ember';

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

  actions: {}
});
