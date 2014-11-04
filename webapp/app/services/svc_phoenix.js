//App.ApplicationStore = DS.Store.extend();

// App.PhoenixController = Ember.Controller.extend({
//   socket: null,
//   topics: Ember.Map.create(),
//   init: function() {
//     var sock = new Phoenix.Socket(App.PHOENIX_ENDPOINT);

//     this.set('socket', sock);
//     sock.onClose = this.get('handleClose').bind(this);
//   },
//   addTopic: function(channel, topic, message, callback) {
//     this.get('socket').join(channel, topic, message || {}, callback || function() {});
//   },
//   handleClose: function() {
//     console.log('connection closed')
//   }
// })

// App.PhoenixSessionController = Ember.Controller.extend({
//   needs: ['phoenix'],
//   init: function() {
//     var socket = this.get('controllers.phoenix');
//     console.log(socket);
//   }
// })




// var Transaction = Ember.Object.extend({

// })

App.PhoenixSocket = Ember.Controller.extend({
  socket: null,
  topics: null,
  init: function() {
    this.set('topics', Ember.Map.create())

    var sock = new Phoenix.Socket(App.PHOENIX_ENDPOINT);
    sock.onClose = this.get('handleClose').bind(this);
    this.set('socket', sock);

    console.log('init')
  },
  addTopic: function(channel, topic, message, callback) {
    this.get('socket').join(channel, topic, message || {}, callback || function() {});
  },
  handleClose: function() {
    console.log('connection closed')
  }
})

App.Session = Ember.Controller.extend({
  needs: ['phoenix'],
  isInitialized: false,
  init: function() {
    console.log('session init')

    this.get('service:phoenix').addTopic('session', 'user', {id: "me"}, this.get('onSessionJoin'))
  },
  onSessionJoin: function() {
    console.log('session join', arguments)
  }
})





Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: 'session',
    //after: 'phoenix',

    initialize: function(container, application) {
      application.register('service:session', App.Session, {singleton: true})

      application.inject('controller', 'service:session', 'service:session');
    }
  })

  Application.initializer({
    name: 'phoenix',
    initialize: function(container, application) {
      application.register('service:phoenix', App.PhoenixSocket, {singleton: true})

      application.inject('service:session', 'service:phoenix', 'service:phoenix')
    }
  })
})