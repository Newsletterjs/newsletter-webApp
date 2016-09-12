import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  fullName: DS.attr('string'),
  avatar: DS.attr(),
  newsletters: DS.hasMany('newsletter'),
  newsletterSubscribers: DS.belongsTo('newsletterSubscribers', {
    inverse: 'user'
  })
});
