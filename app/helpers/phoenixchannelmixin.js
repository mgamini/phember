let Promise = Ember.RSVP.Promise;

export default Ember.Mixin.create({
  channel: null,
  topic: null,
  callbacks: {},
  join(socket, params) {
    return new Promise((resolve, reject) => {
      socket.join(this.get('topic'), params).receive("ok", chan => {
        this.set('channel', chan)

        this.get('bindCallbacks').call(this).then(success => {
          resolve(chan)
        })
      }).receive("error", error => {
        reject(error)
      })
    })
  },
  bindCallbacks() {
    return new Promise((resolve, reject) => {
      let callbacks = this.get('callbacks'),
        channel   = this.get('channel');

      Object.keys(callbacks).forEach(key => {
        channel.on(key, callbacks[key].bind(this))
      })

      resolve(true);
    })
  }
});