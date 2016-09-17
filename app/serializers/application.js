import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute: function keyForAttribute(attr) {
    return attr;
  },
   keyForRelationship: function keyForRelationship(key) {
     return key;
   }
});
