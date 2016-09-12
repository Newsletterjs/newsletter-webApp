import DS from 'ember-data';

export default DS.Model.extend({
  sendPeriod: DS.attr('string', {
    defaultValue: 'instant'
  }),
  newsletter: DS.belongsTo('newsletter'),
  user: DS.belongsTo('user')
});