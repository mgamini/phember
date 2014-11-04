App.NavigationController = Ember.ArrayController.extend({
  needs: ['service:session', 'login'],
  model: Ember.A([
    Ember.Object.create({title: "Posts", location: 'posts', active: null}),
  ]),
  title: "Phember",
  isLoggedIn: Ember.computed.alias('service:session.isAuthenticated'),
  actions: {
    logIn: function() {
      this.get('controllers.login').send('logIn')
    }
  }
});
