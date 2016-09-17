import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },
  model(params) {
    return Ember.RSVP.hash({
      newsletters: this.get('store').query('newsletter', params)
    });
  }
});