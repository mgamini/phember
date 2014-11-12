App.PostsIndexController = Ember.ArrayController.extend({
  hasItems: function() {
    return this.get('content');
  }.property("content.@each"),
});
