var obj = require('../lib/obj.js');

var Controller = obj.extend({
  initialize:function() {

  },
  getTemplate:function() {
    return this.template;
  }
});

module.exports = Controller;