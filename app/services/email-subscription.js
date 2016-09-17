import Ember from 'ember';
import ENV from "../config/environment";

/**
 * Email subscription service
 * Events:
 *   email_subscription_${id}   sucessfull subscribe in newslletter, id is the newslleter id
 *   email_unSubscription_${id} sucessfull unsubscribe from newslleter, id is the newslleter id
 */
export default Ember.Service.extend(Ember.Evented, {
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  /**
   * Subscribe in one email server
   *
   * @param  {String} newsletter required newsletter record
   */
  subscribe: function subscribe(id) {
    if (!id) {
      throw new Error('newsletter param is required in email subscription service');
    }

    let token = this.get('session.data.authenticated.token');

    if (!token) {
      // skip if not authenticated
      return new window.Promisse(function (resolve){ resolve(); });
    }

    let url = ENV.API_HOST + '/newsletter/' + id + '/subscribe';

    return Ember.$.ajax({
      url: url,
      type: 'post',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: 'JWT '+token
      }
    })
    .then( (output)=> {
      // push this new subscription to store
      let sub = this.get('store').push(output);

      if (!sub) {
        return sub;
      }

      this.trigger(`email_subscribed_${id}`);

      return sub;
    });

  },
  unSubscribe: function unSubscribe(id) {
    if (!id) {
      throw new Error('newsletter id param is required in email subscribe service');
    }

    const token = this.get('session.data.authenticated.token');

    if (!token) {
      // skip if not authenticated
      return new window.Promisse(function (resolve){ resolve(); });
    }

    const url = ENV.API_HOST + '/newsletter/' + id + '/un-subscribe';

    return Ember.$.ajax({
      url: url,
      type: 'post',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: 'JWT '+token
      }
    })
    .then( (output)=> {
      let newsletter = this.get('store').peekRecord('newsletter', id);
      let sub = newsletter.get('getSubscription');

      this.trigger(`email_unSubscribed_${id}`);
      // remove from store after delete
      if (sub && sub.unloadRecord) {
        sub.unloadRecord();
      }

      return output;
    });
  }
});
