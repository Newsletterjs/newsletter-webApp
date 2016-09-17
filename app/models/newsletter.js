import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  session: Ember.inject.service('session'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  creator: DS.belongsTo('user', {
    inverse: 'myNewsletters',
    async: true
  }),
  subscribers: DS.hasMany('user', {
    async: true
  }),
  newsletterSubscribers: DS.belongsTo('newsletterSubscribers', {
    inverse: 'newsletter',
    async: true
  }),
  getSubscription: Ember.computed('newsletterSubscribers',
    function() {
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
  }),

  isSubscribed: Ember.computed('newsletterSubscribers', function() {
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
