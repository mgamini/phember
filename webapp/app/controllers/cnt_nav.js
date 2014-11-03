App.NavigationController = Ember.ArrayController.extend({
  model: Ember.A([
    Ember.Object.create({title: "Posts", location: 'posts', active: null}),
  ]),
  title: "Phember"
});
