import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  displayName: DS.attr('string'),
  fullName: DS.attr('string'),
  avatar: DS.attr(),
  newsletters: DS.hasMany('newsletter', {
    async: true
  }),
  newsletterSubscribers: DS.belongsTo('newsletterSubscribers', {
    inverse: 'user',
    async: true
  }),
  myNewsletters: DS.hasMany('newsletter', {
    inverse: 'creator',
    async: true
  })
});
