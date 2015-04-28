import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

import {Channel, Socket} from 'phoenix';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

let socket = new Socket("/ws");
socket.connect();
socket.join("data:join", "tokentokentoken").receive("ok", chan => {
  console.log("got stuff");

  chan.on("user", payload => {
    console.log("payload: " + payload);
  });

  socket.join("data:store", "token2token2").receive("ok", chan => {
    console.log(chan)
  })
});

export default App;
