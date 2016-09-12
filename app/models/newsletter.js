import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  session: Ember.inject.service('session'),

  name: DS.attr('string'),
  description: DS.attr('string'),
  subscribers: DS.hasMany('user'),
  newsletterSubscribers: DS.belongsTo('newsletterSubscribers', {
    inverse: 'newsletter'
  }),
  isSubscribed: Ember.computed('id', 'newsletterSubscribers', function() {
    const newsletterId = this.get('id');
    const userId = this.get('session.data.authenticated.user.id');

    if (!newsletterId) {
      return false;
    }

    let subs = this.get('store').peekAll('newsletterSubscribers');

    for (let i = 0; i < subs.get('length'); i++) {
      let sub = subs.objectAt(i);

      if (
        Number(sub.get('newsletter.id')) === Number(newsletterId) &&
        Number(sub.get('user.id')) === Number(userId)
      ) {
        return sub;
      }
    }

    return false;
  })
});
