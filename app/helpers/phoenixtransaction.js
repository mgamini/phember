export default class {
  constructor(url, type, params, header = {}) {
    this.uuid   = generateUUID();
    this.path    = derivePath(url);
    this.type   = type;
    this.params = params;
    this.header = header;

    return new Promise((resolve, reject) => {
      this.set('onSuccess', json => {
        Ember.run(null, resolve, json)
      });
      this.set('onFailure', json => {
        Ember.run(null, reject, json)
      });
    });
  }

  static payload() {
    return {
      uuid: this.uuid,
      type: this.type,
      params: this.params,
      path: this.path,
      header: this.header
    }
  }

  static generateUUID() {
    let date = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .replace(/[xy]/g, character => {
        let random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (character === "x" ? random : (random & 0x7 | 0x8)).toString(16);
      });
  }

  static derivePath(url) {
    return url.replace(this.host, "")
  }
}
