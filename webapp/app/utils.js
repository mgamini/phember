App.Utils = {
  camelizeObj: function(inp) {
    var out = {};
    Object.keys(inp).forEach(function(key) {
      out[Ember.String.camelize(key)] = inp[key]
    })
    return out;
  },
  typeChecker: function(inp) {
    if (typeof inp === "object") {
      if (inp instanceof Array)
        return "array"
      else
        return "object"
    } else {
      return typeof inp
    }
  },
  findIdx: function(arr, key, value) {
    var res = null;
    arr.some(function(item, idx) {
      if (item && item[key] == value)
        res = idx;
    })

    return res;
  },
  authCookie: {
    toObj: function(obj) {
      try {
        return JSON.parse(atob(obj))
      } catch(error) {
        return false;
      }
    },
    fromObj: function(obj) {
      try {
        return bota(JSON.stringify(obj))
      } catch(error) {
        return false;
      }
    },
  }
}