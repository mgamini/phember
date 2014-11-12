App.PostsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('post');
  }
});


App.PostsNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('post');
  },

  setupController: function(controller, model) {
    this.controllerFor('posts.edit').setProperties({isNew: true, content: this.store.createRecord('post')});
  },

  renderTemplate: function() {
    this.render('posts.edit');
  }
});
