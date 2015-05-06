import DS from "ember-data";


class Transaction {
  constructor() {
    this.uuid = generateUUID();


    return new Promise((resolve, reject) => {
      this.set('onSuccess', json => {
        Ember.run(null, resolve, json)
      });
      this.set('onFailure', json => {
        Ember.run(null, reject, json)
      });
    });
  }

  static generatePayload {

  }

  static generateUUID {
    let date = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .replace(/[xy]/g, character => {
        let random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (character === "x" ? random : (random & 0x7 | 0x8)).toString(16);
      });
  }

  static derivePath {
    return this.get('url').replace(this.host, "")
  }
}


export
default DS.RESTAdapter.extend({
  _transactions: {},


})