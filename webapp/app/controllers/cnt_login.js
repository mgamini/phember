App.LoginController = Ember.Controller.extend({
  needs: ['service:session'],
  actions: {
    logIn: function() {
      this.get('service:session').send(
        'join',
        { token: "tokentokentoken", id: 123456789},
        this.get('logInSuccess'),
        this.get('logInFailure'));
    }
  },
  logInSuccess: function() {
    console.log('success', arguments)
  },
  logInFailure: function() {
    console.log('failure', arguments)
  }
});
