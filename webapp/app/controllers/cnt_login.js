App.LoginController = Ember.Controller.extend({
  needs: ['service:session'],
  actions: {
    logIn: function() {
      this.get('service:session').send('join', "tokentokentoken", 123456789)
    }
  }
});
