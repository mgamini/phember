window.App = Ember.Application.create({
  // ember debugging
//  LOG_ACTIVE_GENERATION:    true,
//  LOG_BINDINGS:             true,
  LOG_TRANSITIONS:          true,
//  LOG_TRANSITIONS_INTERNAL: true,
//  LOG_VIEW_LOOKUPS:         true,

  PLATFORMS: [
    'android',
    'editor',
    'ios',
    'osx',
    'linux',
    'windows'
  ]
});

var map = Ember.ArrayPolyfills.map;
App.ListLinkComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});
App.LoginController = Ember.Controller.extend({
  pagetitle: "Log In",
  onSuccess: function(res) {
    res.id = 0;
    this.store.createRecord('current_user', App.Utils.camelizeObj(res))
    this.transitionToRoute('news_items')
  },
  onFail: function(error) {
    this.set('errorMessage', error)
  },
  actions: {
    login: function() {
      params = this.getProperties('email', 'password');

      if (!App.Validate.obj(params, {email: 'email', password: 'string'})) {
        this.set('errorMessage', 'Please enter a valid email address and password.')
        return false;
      }

      this.get('session').logIn(params, this.get('onSuccess').bind(this), this.get('onFail').bind(this));
    }
  }
});

App.NavigationController = Ember.ArrayController.extend({
  model: Ember.A([
    Ember.Object.create({title: "Posts", location: 'posts', active: null}),
  ]),
  title: "Phember"
});

App.PostsIndexController = Ember.ArrayController.extend({});

App.PostController = Ember.Controller.extend({

})
App.Router.map(function() {
  this.route('login');
  this.route('logout');

  this.resource('posts', function() {

  })
});

App.IndexRoute = Ember.Route.extend({
  // redirect: function() {
  //   this.transitionTo('login');
  // }
});

// App.LoginRoute = Em.Route.extend(Auth.LoginRouteMixin);
// App.LogoutRoute = Em.Route.extend(Auth.LogoutRouteMixin);

App.Utils = {
  camelizeObj: function(inp) {
    var out = {};
    Object.keys(inp).forEach(function(key) {
      out[Ember.String.camelize(key)] = inp[key]
    })
    return out;
  },
  typeChecker: function(inp) {
    if (typeof inp === "object") {
      if (inp instanceof Array)
        return "array"
      else
        return "object"
    } else {
      return typeof inp
    }
  },
  findIdx: function(arr, key, value) {
    var res = null;
    arr.some(function(item, idx) {
      if (item && item[key] == value)
        res = idx;
    })

    return res;
  },
  authCookie: {
    toObj: function(obj) {
      try {
        return JSON.parse(atob(obj))
      } catch(error) {
        return false;
      }
    },
    fromObj: function(obj) {
      try {
        return bota(JSON.stringify(obj))
      } catch(error) {
        return false;
      }
    },
  }
}
App.NavigationView = Ember.View.extend({
  tagName: 'nav',
  classNames: ['top-bar', 'navbar'],
  templateName: 'navigation'
});

App.PostView = Ember.View.extend({

})