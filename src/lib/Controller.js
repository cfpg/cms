var obj = require('../lib/obj.js');

var Controller = obj.extend({
  initialize:function() {
    this.setView();
    this.setModel();
  },
  setView:function() {
    this.view = null;
  },
  setModel:function() {
    this.model = null;
  },
  getTemplate:function() {
    if (!this.view) {
      console.error('Trying to get template of Controller without View: '+JSON.stringify(this));
      return false;
    }
    return this.view.template;
  }
});

module.exports = Controller;