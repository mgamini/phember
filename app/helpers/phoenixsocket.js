import {Socket} from 'phoenix';
import Channel from './phoenixchannel';
import SocketAdapter from "./phoenixsocketadapter";

export default Ember.Controller.extend({
  socket: {},
  wsurl: "/ws",
  credentials: null,
  channels: {},
  init() {
    this.set('socket', new Socket(this.get("wsurl")));
    let connect = this.get('socket').connect();

    this.set('socket.onClose', this.get("onClose"));


    this.openAuthChannel().then(this.openDataChannel.bind(this));
  },
  openAuthChannel() {
    let joinCallbacks = {
      user: credentials => {
        console.log("got credentials")
        this.set('credentials', credentials);
      }
    }

    let chan = Channel.create({topic: "data:join", callbacks: joinCallbacks});

    this.set('channels.auth', chan);
    return chan.join(this.get('socket'), arguments);

  },
  openDataChannel() {
    console.log("joining data")

    let chan = SocketAdapter.create({topic: "data:store"});

    this.set('channels.store', chan);
    return chan.join(this.get('socket'), this.get('credentials'));
  },
  onClose() {
    console.log('Socket closed.')
  }
})