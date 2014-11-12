App.PostsNewController = Ember.ObjectController.extend({
  actions: {
    submitForm: function(event) {
      this.transitionToRoute('posts.index');
    }
  }
});
