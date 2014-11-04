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