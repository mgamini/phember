App.Router.map(function() {
  this.route('login');
  this.route('logout');

  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
    this.route("new");
    this.route("edit", {path: "/:post_id"});
  })
});
