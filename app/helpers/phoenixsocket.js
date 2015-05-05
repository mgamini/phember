import {Socket} from 'phoenix';
import Channel from './phoenixchannel';

export default Ember.Controller.extend({
  socket: {},
  wsurl: "/ws",
  credentials: null,
  channels: {},
  init: function() {
    this.set('socket', new Socket(this.get("wsurl")));
    let connect = this.get('socket').connect();

    this.set('socket.onClose', this.get("onClose"));

    let joinCallbacks = {
      user: credentials => {
        this.set('credentials', credentials)
      }
    }

    this.set('channels.auth', Channel
      .create({topic: "data:join", callbacks: joinCallbacks})
      .join(this.get('socket'), arguments).then(channel => {
        console.log(channel)
      })
    );

  },
  onClose: function() {
    console.log('Socket closed.')
  }
})