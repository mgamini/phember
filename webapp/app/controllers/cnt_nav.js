App.NavigationController = Ember.ArrayController.extend({
  model: Ember.A([
    //Ember.Object.create({title: "Index", location: 'index', active: null}),
    Ember.Object.create({title: "Posts", location: 'posts', active: null}),
  ]),
  title: "Stuff!"
});