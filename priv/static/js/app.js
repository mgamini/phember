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
  ],

  PHOENIX_ENDPOINT: location.protocol.match(/^https/) ? "wss://" + location.host + "/ws" : "ws://" + location.host + "/ws",
});

var map = Ember.ArrayPolyfills.map;
App.ApplicationStore = DS.Store.extend();

App.PhoenixController = Ember.Controller.extend({
  socket: null,
  topics: Ember.Map.create(),
  init: function() {
    var sock = new Phoenix.Socket(App.PHOENIX_ENDPOINT);

    this.set('socket', sock);
    sock.onClose = this.get('handleClose').bind(this);
  },
  addTopic: function(channel, topic, message, callback) {
    this.get('socket').join(channel, topic, message || {}, callback || function() {});
  },
  handleClose: function() {
    console.log('connection closed')
  }
})

App.PhoenixSessionController = Ember.Controller.extend({
  needs: ['phoenix'],
  init: function() {
    var socket = this.get('controllers.phoenix');
    console.log(socket);
  }
})




var Transaction = Ember.Object.extend({

})




// EmPhoenix = {
//   init: function(container, app) {
//     var socket = EmPhoenix.Socket.create();
//     container.register('emPhoenix:current', socket, {instantiate: false, singleton: true })
//   }
// };

// EmPhoenix.Socket = Em.ObjectController.extend({
//   socket: null,
//   alert: null,
//   reconnect: null,
//   topics: Ember.Map.create(),
//   init: function() {
//     var protocol = location.protocol.match(/^https/) ? 'wss' : 'ws';
//     var sock = new Phoenix.Socket(protocol + "://" + location.host + "/ws");
//     this.set('socket', sock)
//     sock.onClose = this.get('handleClose').bind(this);

//     this.set('alert', App.__container__.lookup('woof:main'));
//     this.addTopic('data', 'data', function() {
//       console.log('join callback =>', arguments)
//     });
//   },
//   addTopic: function(channel, topic, joinCallback) {
//     var promise = new Ember.RSVP.Promise(function(res, rej) {
//       this.get('socket').join(channel, topic, {},
//         function(channelResponse) {
//           this.get('topics').set(topic, channelResponse);
//           joinCallback && channelResponse.on('join', joinCallback);
//           res(channelResponse);
//         }.bind(this)
//       )
//     }.bind(this))

//     return promise;
//   },
//   handleClose: function(ev) {
//     this.alert.danger('You have been disconnected from the server!')
//     // console.log('closing')
//     // this.set('reconnect', setInterval(this.tryReconnect.bind(this), 5000))
//   },
//   // tryReconnect: function() {
//   //   console.log('reconnecting...')
//   //   this.addTopic('data', 'data');
//   // }
// })

// EmPhoenix.Channel = Em.Object.extend({})

// Em.Application.initializer({
//   name: 'emPhoenix',
//   after: 'registerWoofMessages',
//   initialize: EmPhoenix.init
// });

// App.inject('view', 'emPhoenix', 'emPhoenix:current');
// App.inject('controller', 'emPhoenix', 'emPhoenix:current');






// Web.Store = DS.Store.extend();

// DS.WebsocketAdapter = DS.RESTAdapter.extend({
//   callbacks: {},
//   socket: null,
//   beforeOpenQueue: [],

//   ajax: function(url, type, params) {
//     var adapter = this;
//     var uuid = adapter.generateUuid();

//     adapter.initializeSocket();

//     return new Ember.RSVP.Promise(function(resolve, reject) {
//       var success = function(json) {
//         Ember.run(null, resolve, json);
//       };
//       var error = function(json) {
//         Ember.run(null, reject, json);
//       }
//       callback = { success: success, error: error }
//       adapter.callbacks[uuid] = callback;

//       var payload = { uuid: uuid, path: adapter.path(url), type: type, params: params, version: adapter.version || 1 };
//       if(adapter.socket.readyState === 1) {
//         adapter.socket.send(JSON.stringify(payload));
//       }
//       else {
//         adapter.beforeOpenQueue.push(payload);
//       }
//     });
//   },

//   initializeSocket: function() {
//     var adapter = this;

//     if(adapter.socket === null) {
//       adapter.socket = new WebSocket(adapter.host + "/websocket");
//       adapter.socket.onopen = function(event) { adapter.open.apply(adapter, [event]); };
//       adapter.socket.onmessage = function(event) { adapter.message.apply(adapter, [event]); };
//       adapter.socket.onerror = function(event) { adapter.error.apply(adapter, [event]); };
//     }
//   },

//   open: function(event) {
//     var adapter = this;

//     if(adapter.beforeOpenQueue.length > 0) {
//       adapter.beforeOpenQueue.forEach(function(payload) {
//         adapter.socket.send(JSON.stringify(payload));
//       });
//       adapter.beforeOpenQueue = [];
//     }
//   },

//   message: function(event) {
//     var adapter = this;
//     var result = JSON.parse(event.data);

//     adapter.callbacks[result.uuid].success(result.payload);
//     delete adapter.callbacks[result.uuid];
//   },

//   error: function(event) {
//     alert(event.data);
//   },

//   generateUuid: function() {
//     var date = new Date().getTime();
//     var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(character) {
//       var random = (date + Math.random() * 16) % 16 | 0;
//       date = Math.floor(date/16);
//       return (character === "x" ? random : (random & 0x7 | 0x8)).toString(16);
//     });
//     return uuid;
//   },

//   path: function(url) {
//     return url.replace(this.host, "");
//   }
// });

// Web.ApplicationAdapter = DS.WebsocketAdapter.extend({
//   host: "ws://localhost:4000",
//   version: 1
// });
App.ListLinkComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});
App.LoginController = Ember.Controller.extend({
  needs: ['service:session'],
  actions: {
    logIn: function() {
      this.get('service:session').send(
        'join',
        { token: "tokentokentoken", id: 123456789},
        this.get('logInSuccess'),
        this.get('logInFailure'));
    }
  },
  logInSuccess: function() {
    console.log('success', arguments)
  },
  logInFailure: function() {
    console.log('failure', arguments)
  }
});

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

App.PostsIndexController = Ember.ArrayController.extend({});

App.PostController = Ember.Controller.extend({

})
App.Author = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  posts: DS.hasMany('post', {async: true})
})
App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.belongsTo('author', {async: true})
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

App.PostsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('post');
  }
});
DS.PhoenixSocketAdapter = DS.RESTAdapter.extend({
  needs: ['phoenix', 'session'],
  _initialized: false,
  _transactions: {},
  _channel: null,

  setSocket: function() {
    this.container.lookup('service:phoenix').addTopic("session", "data", {}, this.get('setSocketResponse').bind(this))
  },
  setSocketResponse: function(chan, res) {
    chan.on("data", this.get('onData').bind(this));

    this.set('_channel', chan);
    this.set('_initialized', true);
  },
  onData: function(data) {
    console.log("got data: ", data)
    var caller = this.get('_transactions')[data.uuid];

    // this should handle error
    if (true) {
      caller.success(data.message)
    } else {
      caller.error(data.message)
    }

    caller.destroy();
    delete caller;
  },
  ajax: function(url, type, params) {
    var uuid = this.get('generateUuid')();
    var txn = this.get('_transactions')[uuid] = DS.PhoenixTransaction.create({uuid: uuid, channel: this.get('_channel')})

    txn.send(url, type, params);

    return txn.promise;
  },
  generateUuid: function() {
    var date = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(character) {
      var random = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date/16);
      return (character === "x" ? random : (random & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  },
})

DS.PhoenixTransaction = Ember.Object.extend({
  uuid: null,
  promise: null,
  success: null,
  error: null,
  channel: null,
  init: function() {
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      this.set('success', function(json) {
        Ember.run(null, resolve, json);
      });
      this.set('error', function(json) {
        Ember.run(null, reject, json);
      })
    }.bind(this))
    this.set('promise', promise);
  },
  send: function(url, type, params) {
    var payload = {uuid: this.get('uuid'), type: type, params: params, path: this.get('derivePath')(url) }

    this.get('channel').send('data', payload);
  },
  derivePath: function(url) {
    return url.replace(this.host, "");
  }
})

App.PhoenixSocket = Ember.Controller.extend({
  socket: null,
  topics: null,
  init: function() {
    this.set('topics', Ember.Map.create())

    var sock = new Phoenix.Socket(App.PHOENIX_ENDPOINT);
    sock.onClose = this.get('handleClose').bind(this);
    this.set('socket', sock);
  },
  addTopic: function(channel, topic, message, callback) {
    var topicKey = channel + ":" + topic;

    if (this.get('topics').get(topicKey)) {
      callback(this.get('topics').get(topicKey), true);
    } else {
      this.get('socket').join(channel, topic, message || {}, this.get('handleAddTopic').bind(this, topicKey, callback));
    }
  },
  handleAddTopic: function(topicKey, callback, channel) {
    channel.on("join", function(res) {
      this.get('topics').set(topicKey, channel);
      callback(channel, res)
    }.bind(this))
    channel.on("error", function(res) {
      callback("error", res)
    })
  },
  handleClose: function() {
    console.log('connection closed')
  }
})

App.PhoenixSession = Ember.Controller.extend({
  needs: ['phoenix'],
  channel: null,
  isAuthenticated: false,
  init: function() {},
  actions: {
    join: function(params, success, fail) {
      this.get('service:phoenix').addTopic('session', 'user', params, function(chan, res) {
        if (chan == "error") {
          fail(res)
        } else {
          this.set('isAuthenticated', true);
          this.set('channel', chan);
          success(res);
        }
      }.bind(this))
    }
  }
})

Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: 'session',

    initialize: function(container, application) {
      application.register('service:session', App.PhoenixSession, {singleton: true})

      application.inject('controller', 'service:session', 'service:session');
    }
  })

  Application.initializer({
    name: 'phoenix',
    initialize: function(container, application) {
      application.register('service:phoenix', App.PhoenixSocket, {singleton: true})
      application.register('adapter:phoenix', DS.PhoenixSocketAdapter, {singleton: true});

      App.ApplicationAdapter = DS.PhoenixSocketAdapter;
      container.lookup('adapter:application').setSocket();

      application.inject('service:session', 'service:phoenix', 'service:phoenix')
    }
  })
})
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