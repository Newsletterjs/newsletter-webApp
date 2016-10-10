// // app/controllers/login.js
// import Ember from 'ember';

// export default Ember.Controller.extend({
//   session: Ember.inject.service(),

//   actions: {
//     authenticate: function() {
//       var credentials = this.getProperties('identification', 'password'),
//         authenticator = 'authenticator:jwt';

//       this.get('session')
//       .authenticate(authenticator, credentials)
//       .then( ()=> {
//         // redirect to desk page after login
//         this.transitionToRoute('/');
//         // reload after transition to load authenticated context
//         window.location.reload();
//       })
//       .catch(function (reason) {
//         console.warn('loginerrro:', reason);
//       });
//     }
//   }
// });

// app/controllers/login.js
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});