import DS from 'ember-data';
import ENV from "../config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.API_HOST,
  authorizer: 'authorizer:oauth2',
  pathForType: function(type) {
    return type;
  }
});