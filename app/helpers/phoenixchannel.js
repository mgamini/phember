import Mixin from "./phoenixchannelmixin.js";

export default Ember.Object.extend(Mixin, {});

// export default Ember.Object.extend({
//   channel: null,
//   topic: null,
//   callbacks: {},
//   join(socket, params) {
//     return new Promise((resolve, reject) => {
//       socket.join(this.get('topic'), params).receive("ok", chan => {
//         this.set('channel', chan)

//         this.get('bindCallbacks').call(this)
//         resolve(chan)
//       }).receive("error", error => {
//         reject(error)
//       })
//     })
//   },
//   bindCallbacks() {
//     let callbacks = this.get('callbacks'),
//         channel   = this.get('channel');

//     Object.keys(callbacks).forEach(key => {
//       channel.on(key, callbacks[key].bind(this))
//     })
//   }
// });