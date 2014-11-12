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

    this.get('unloadQueue').call(this);
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
  unloadQueue: function() {
    var txns = this.get('_transactions');

    for (var uuid in txns) {
      this.get('_channel').send('data', txns[uuid].payload());
    }
  },
  ajax: function(url, type, params) {
    var uuid = this.get('generateUuid')();
    var txn = this.get('_transactions')[uuid] = DS.PhoenixTransaction.create({uuid: uuid, url: url, type: type, params: params})

    if (this.get('_initialized')) {
      this.get('_channel').send('data', txn.payload());
    }

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
  url: null,
  type: null,
  params: null,
  promise: null,
  success: null,
  error: null,
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
  payload: function(url, type, params) {
    return {uuid: this.get('uuid'), type: this.get('type'), params: this.get('params'), path: this.get('derivePath').call(this) }
  },
  derivePath: function() {
    return this.get('url').replace(this.host, "");
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