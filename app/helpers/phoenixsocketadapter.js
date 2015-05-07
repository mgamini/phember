import DS from "ember-data";
import Transaction from "./phoenixtransaction";
import Channel from "./phoenixchannelmixin.js";

export default DS.RESTAdapter.extend(Channel, {
  _transactions: {},
  header: {},
  callbacks: {
    data: data => { this.onData.call(this, data) }
  },

  ajax() {
    let txn = new Transaction(arguments, this.get('header'));
    this.set('_transactions.' + txn.uuid, txn);

    return txn;
  },

  onData(data) {
    let caller = this.get('_transactions.' + data.uuid);

    if (data.success) {
      caller.onSuccess(data.message);
    } else {
      caller.onFailure(data.message);
    }

    delete this.get('_transactions.' + data.uuid);
  }
})