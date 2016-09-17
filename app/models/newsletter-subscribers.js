import DS from 'ember-data';

export default DS.Model.extend({
  sendPeriod: DS.attr('string', {
    defaultValue: 'instant'
  }),
  newsletter: DS.belongsTo('newsletter', {
    async: true
  }),
  user: DS.belongsTo('user', {
    async: true
  }),

  username: function username() {
    console.log('r', this.get('newsletter.creator'));
    return this.get('newsletter.creator.username');
  }.property('newsletter.creator.id'),

});