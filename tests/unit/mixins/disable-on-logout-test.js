import Ember from 'ember';
import DisableOnLogoutMixin from 'newsletter-webApp/mixins/disable-on-logout';
import { module, test } from 'qunit';

module('Unit | Mixin | disable on logout');

// Replace this with your real tests.
test('it works', function(assert) {
  let DisableOnLogoutObject = Ember.Object.extend(DisableOnLogoutMixin);
  let subject = DisableOnLogoutObject.create();
  assert.ok(subject);
});
