import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model (params) {
    let userId = this.get('session.session.content.authenticated.user.id');

    return Ember.RSVP.hash({
      record: this.get('store').findRecord('newsletter', params.id),
      subscription: new window.Promise( (resolve)=> {
        let subs = this.get('store').peekAll('newsletterSubscribers');

        for (let i = 0; i < subs.get('length'); i++) {
          let sub = subs.objectAt(i);

          if (
            Number(sub.get('newsletter.id')) === Number(params.id) &&
            Number(sub.get('user.id')) === Number(userId)
          ) {
            return resolve(sub);
          }
        }

        resolve(false);
      })
    });
  }
});
