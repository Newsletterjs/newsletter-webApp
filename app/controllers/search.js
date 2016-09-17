import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],
  search: null,

  filteredNewsletters: Ember.computed.filter('model.newsletters', function(newsletter) {
    if (Ember.get(newsletter, 'isSubscribed')) {
      return false;
    }

    let search = this.get('search');

    if (!search) {
      return true;
    }

    let name = Ember.get(newsletter, 'name');


    if (!name) {
      return false;
    }

    if (name.indexOf(search) === 0) {
      return true;
    } else {
      return false;
    }
  }).property('search', 'model', 'model.newsletters.@each.isSubscribed')
});