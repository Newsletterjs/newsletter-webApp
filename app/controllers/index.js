import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    {
      "propertyName": "name",
      "title": "Name",
      "disableFiltering": true
    },
    {
      "title": "Actions",
      "template": "user/newsletter/table/actions",
      "disableFiltering": true
    }
  ],
  actions: {
    viewRecord: function (record) {
      this.transitionToRoute('user.newsletter', record.id);
    },
    unSubscribe: function (record) {
      this.transitionToRoute('user.newsletter.unsubscribe', record.id);
    }
  }
});