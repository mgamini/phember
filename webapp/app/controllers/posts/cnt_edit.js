App.PostsEditController = Ember.ObjectController.extend({
  actions: {
    updateItem: function(post) {
      var hash = {
        // "author": 1
      }

      post.setProperties(hash);
      post.save();

      this.get("target").transitionTo("posts");
    },

    cancel: function() {
      this.content.deleteRecord();
      this.transitionToRoute('posts.index');
    }
  },

  isNew: function() {
    return this.get('content').get('id');
  }.property()
});
