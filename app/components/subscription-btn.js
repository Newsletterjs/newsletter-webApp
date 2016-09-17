import Ember from 'ember';
import disableOnLogout from '../mixins/disable-on-logout';

/**
 *
 *  Example:
    {{subscription-btn
      modelId=newsletter.id
      isSubscribed=newsletter.isSubscribed
    }}
 */
export default Ember.Component.extend(disableOnLogout, {
  emailSubscription: Ember.inject.service('email-subscription'),
  id: null,
  isSubscribed: false,
  tagName: 'span',

  // event watchers:

  listen: function() {
    if (this.get('session.isAuthenticated')) {
      this.set('disabled', true);
    }

    let id = this.get('modelId');

    if (id) {
      this.get('emailSubscription').on(`email_subscribed_${id}`, this, 'onSubscribe');
      this.get('emailSubscription').on(`email_unSubscribed_${id}`, this, 'onUnSubscribe');
    }
  }.on('init'),

  cleanup: function() {
    let id = this.get('modelId');

    this.get('emailSubscription').off(`email_subscribed_${id}`, this, 'onSubscribe');
    this.get('emailSubscription').off(`email_unSubscribed_${id}`, this, 'onUnSubscribe');
  }.on('willDestroyElement'),

  onSubscribe: function onSubscribe() {
    this.set('isSubscribed', true);
  },
  onUnSubscribe: function onUnSubscribe() {
    this.set('isSubscribed', false);
  },

  actions: {
    subscribe() {
      this.get('emailSubscription').subscribe(this.get('modelId'));
    },
    unSubscribe() {
      this.get('emailSubscription').unSubscribe(this.get('modelId'));
    }
  }
});
