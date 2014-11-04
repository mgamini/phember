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